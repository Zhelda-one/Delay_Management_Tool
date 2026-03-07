use nix::poll;
use std::io::{Read, Write};
use std::os::fd::AsFd;
use std::{fs, time};

#[derive(Debug, Eq, PartialEq, Clone)]
pub enum TimeoutError<E> {
    Timeout,
    Other(E),
}

impl<E> TimeoutError<E> {
    pub fn is_timeout(&self) -> bool {
        matches!(self, TimeoutError::Timeout)
    }
}

#[derive(Debug)]
pub enum UnixIoError {
    Errno(nix::errno::Errno),
    Io(std::io::Error),
}

pub type TimeoutResult<T, E> = core::result::Result<T, TimeoutError<E>>;
pub type Result<T> = TimeoutResult<T, UnixIoError>;

pub fn write_timeout(f: &mut fs::File, data: &[u8], timeout: time::Duration) -> Result<usize> {
    poll_file(f, timeout, poll::PollFlags::POLLOUT)?;
    f.write(data)
        .map_err(|err| TimeoutError::Other(UnixIoError::Io(err)))
}

pub fn read_timeout(f: &mut fs::File, buf: &mut [u8], timeout: time::Duration) -> Result<usize> {
    poll_file(f, timeout, poll::PollFlags::POLLIN)?;
    f.read(buf)
        .map_err(|err| TimeoutError::Other(UnixIoError::Io(err)))
}

pub fn poll_file(f: &fs::File, timeout: time::Duration, flags: poll::PollFlags) -> Result<()> {
    let fd = poll::PollFd::new(f.as_fd(), flags);
    let mut fds = [fd];
    let timeout = poll::PollTimeout::try_from(timeout).unwrap();

    match poll::poll(&mut fds, timeout) {
        Ok(0) => Err(TimeoutError::Timeout),
        Err(e) => Err(TimeoutError::Other(UnixIoError::Errno(e))),
        _ => Ok(()),
    }
}
