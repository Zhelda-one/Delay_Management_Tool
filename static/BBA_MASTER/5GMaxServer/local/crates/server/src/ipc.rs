use core::ffi::c_int;
use nix::sys::{self, signal};
use nix::unistd;
use shared::ipc_protocol::{self, ClientMessage, ServerMessage};
use std::fs;
use std::io::{Read, Write};
use std::os::unix::fs::MetadataExt;
use std::path::Path;
use std::time::Duration;

pub fn init_signal_handler() {
    let server_pipe_path = std::path::Path::new(ipc_protocol::SERVER_PIPE_NAME);
    if !server_pipe_path.exists() {
        unistd::mkfifo(
            ipc_protocol::SERVER_PIPE_NAME,
            sys::stat::Mode::from_bits(0o777).unwrap(),
        )
        .unwrap();
    }

    let client_pipe_path = std::path::Path::new(ipc_protocol::CLIENT_PIPE_NAME);
    if !client_pipe_path.exists() {
        unistd::mkfifo(
            ipc_protocol::CLIENT_PIPE_NAME,
            sys::stat::Mode::from_bits(0o777).unwrap(),
        )
        .unwrap();
    }

    unsafe {
        signal::signal(
            signal::Signal::SIGUSR1,
            signal::SigHandler::Handler(signal_handler),
        )
        .unwrap();
    }
}

extern "C" fn signal_handler(_arg: c_int) {
    println!("Received a signal from another process...");

    std::thread::spawn(|| {
        let mut client_pipe = fs::OpenOptions::new()
            .read(true)
            .write(true)
            .create(false)
            .open(ipc_protocol::CLIENT_PIPE_NAME)
            .unwrap();
        let mut server_pipe = fs::OpenOptions::new()
            .read(true)
            .write(true)
            .create(false)
            .open(ipc_protocol::SERVER_PIPE_NAME)
            .unwrap();

        let mut buffer = [0u8; 1024];

        loop {
            client_pipe.read(&mut buffer).unwrap();

            let message: ClientMessage = bincode::deserialize(&buffer).unwrap();

            let resp = match message {
                ClientMessage::GetCpuLoad => ServerMessage::SendCpuLoad(measure_cpu_load()),
                ClientMessage::GetDiskUsage => {
                    ServerMessage::SendDiskUsage(measure_disk_usage())
                }
                ClientMessage::Goodbye => {
                    println!("Received a goodbye message from the pipe, shutting down the helper thread...");
                    break;
                }
            };

            let serialized = bincode::serialize(&resp).unwrap();
            server_pipe.write(&serialized).unwrap();
        }
    });
}

fn measure_cpu_load() -> f32 {
    let coef = 100;

    let start = unsafe { clock() };
    std::thread::sleep(Duration::from_millis(1000 / coef));
    let end = unsafe { clock() };

    (end - start) as f32 / CLOCKS_PER_SEC as f32 * coef as f32
}

fn measure_disk_usage() -> f32 {
    (total_dir_size("./5gmax") + total_dir_size("./simulations")) / 1000.0
}

/// This procedure calculates the size of a directory in bytes.
fn total_dir_size(path: impl AsRef<Path>) -> f32 {
    let mut sum = 0.0;

    let path = path.as_ref();
    let entries = fs::read_dir(path).unwrap();
    for entry in entries {
        let entry = entry.unwrap();
        let meta = entry.metadata().unwrap();

        if meta.is_file() {
            sum += meta.size() as f32;
        } else if meta.is_dir() {
            sum += total_dir_size(entry.path());
        }
    }

    sum
}

const CLOCKS_PER_SEC: i64 = 1_000_000;

extern "C" {
    fn clock() -> i64;
}
