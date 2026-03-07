use super::IpcApi;
use nix::sys::signal;
use nix::unistd;
use shared::ipc_protocol::{self, ClientMessage, ServerMessage};
use shared::util;
use std::io::{Read, Write};
use std::sync::{LazyLock, Mutex, RwLock};
use std::time::Duration;
use std::{borrow::Borrow, collections::HashMap, fs, path::PathBuf};

fn find_process_id(name: impl AsRef<str>) -> Option<u32> {
    let proc = PathBuf::from("/proc");

    for process in fs::read_dir(&proc).unwrap() {
        let process = process.unwrap();

        if !process.metadata().unwrap().is_dir() {
            continue;
        }

        let cmdline_path = process.path().join("cmdline");

        if !cmdline_path.exists() {
            continue;
        }

        let contents = fs::read(cmdline_path).unwrap();
        let pname = contents.split(|c| *c == b'/').last().unwrap();
        // this is needed because these cmdline paths contain a null terminator!
        let pname = &pname[..pname.len() - 1];

        if std::str::from_utf8(pname).unwrap() == name.as_ref() {
            return Some(process.file_name().to_str().unwrap().parse().unwrap());
        }
    }

    None
}

#[derive(Debug)]
pub struct NamedPipeIpcApi {
    pid: u32,
    signal_sent: RwLock<bool>,
    client_pipe: LazyLock<Mutex<fs::File>>,
    server_pipe: LazyLock<Mutex<fs::File>>,
}

#[derive(Debug)]
pub enum ServerCommunicationError {
    Encoding(bincode::Error),
    Io(std::io::Error),
    Errno(nix::errno::Errno),
    Timeout,
}

impl From<util::TimeoutError<util::UnixIoError>> for ServerCommunicationError {
    fn from(value: util::TimeoutError<util::UnixIoError>) -> Self {
        match value {
            util::TimeoutError::Timeout => Self::Timeout,
            util::TimeoutError::Other(e) => match e {
                util::UnixIoError::Io(err) => Self::Io(err),
                util::UnixIoError::Errno(err) => Self::Errno(err),
            },
        }
    }
}

const READ_TIMEOUT: Duration = Duration::from_millis(20);

impl NamedPipeIpcApi {
    pub fn new(name: impl AsRef<str>) -> Option<Self> {
        let pid = find_process_id(name)?;

        Some(Self {
            pid,
            signal_sent: RwLock::new(false),
            client_pipe: LazyLock::new(|| {
                let f = fs::OpenOptions::new()
                    .read(true)
                    .write(true)
                    .create(false)
                    .open(ipc_protocol::CLIENT_PIPE_NAME)
                    .unwrap();
                Mutex::new(f)
            }),
            server_pipe: LazyLock::new(|| {
                let f = fs::OpenOptions::new()
                    .read(true)
                    .write(true)
                    .create(false)
                    .open(ipc_protocol::SERVER_PIPE_NAME)
                    .unwrap();
                Mutex::new(f)
            }),
        })
    }

    fn send_message(&self, message: ClientMessage) -> Result<(), ServerCommunicationError> {
        let bytes = bincode::serialize(&message).map_err(ServerCommunicationError::Encoding)?;
        let mut pipe = self.client_pipe.lock().unwrap();
        pipe.write(&bytes).map_err(ServerCommunicationError::Io)?;
        Ok(())
    }

    #[allow(unused)]
    fn wait_for_message_timeout(&self) -> Result<ServerMessage, ServerCommunicationError> {
        let mut pipe = self.server_pipe.lock().unwrap();
        let mut buf = [0u8; 256];

        util::read_timeout(&mut pipe, &mut buf, READ_TIMEOUT)?;

        bincode::deserialize(&buf).map_err(ServerCommunicationError::Encoding)
    }

    fn wait_for_message(&self) -> Result<ServerMessage, ServerCommunicationError> {
        let mut pipe = self.server_pipe.lock().unwrap();
        let mut buf = [0u8; 256];
        pipe.read(&mut buf).map_err(ServerCommunicationError::Io)?;

        bincode::deserialize(&buf).map_err(ServerCommunicationError::Encoding)
    }

    fn send_signal_to_server(&self) -> nix::Result<()> {
        let pid = unistd::Pid::from_raw(self.pid as i32);
        signal::kill(pid, signal::Signal::SIGUSR1)
    }
}

impl IpcApi for NamedPipeIpcApi {
    fn cpu_load(&self) -> Option<f32> {
        if !*self.signal_sent.read().unwrap() {
            self.send_signal_to_server().ok()?;
            let mut ws = self.signal_sent.write().unwrap();
            *ws = true;
        }

        self.send_message(ClientMessage::GetCpuLoad).ok()?;
        let message = self.wait_for_message().ok()?;

        match message {
            ServerMessage::SendCpuLoad(load) => Some(load),
            _ => None,
        }
    }

    fn memory_usage(&self) -> Option<f32> {
        let status = fs::read_to_string(format!("/proc/{}/status", self.pid)).ok()?;
        let rss = find_in_proc_status(&status, RSS_KEY)?;
        let rss = rss.strip_suffix(" kB").unwrap();

        rss.parse().ok()
    }

    fn disk_usage(&self) -> Option<f32> {
        self.send_message(ClientMessage::GetDiskUsage).ok()?;
        let message = self.wait_for_message().ok()?;

        match message {
            ServerMessage::SendDiskUsage(usage) => Some(usage),
            _ => None,
        }
    }
}

impl Drop for NamedPipeIpcApi {
    fn drop(&mut self) {
        // simply ignore the result here, so that we don't panic even if we can't send the message
        // right now, because panicking in destructor is the last thing you want :)
        let _ = self.send_message(ClientMessage::Goodbye);
    }
}

const RSS_KEY: &str = "VmRSS";

#[allow(unused)]
fn parse_proc_status(contents: impl AsRef<str>) -> HashMap<String, String> {
    let mut contents = contents.as_ref();
    let mut result = HashMap::new();

    while !contents.is_empty() {
        let idx = contents.find(':').unwrap();
        let key = &contents[..idx];
        let value = &contents[idx + 1..].trim();
        result.insert(key.to_string(), value.to_string());

        let nl = contents.find('\n').unwrap();
        contents = &contents[nl + 1..];
    }

    result
}

fn find_in_proc_status<'s, S, K>(status: &'s S, key: K) -> Option<&'s str>
where
    S: Borrow<str> + 's,
    K: AsRef<str>,
{
    let mut status = status.borrow();

    while !status.is_empty() {
        let idx = status.find(':').unwrap();
        let s_key = &status[..idx];

        let nl = status.find('\n').unwrap();
        if s_key == key.as_ref() {
            let value = status[idx + 1..nl].trim();
            return Some(value);
        }

        status = &status[nl + 1..];
    }

    None
}
