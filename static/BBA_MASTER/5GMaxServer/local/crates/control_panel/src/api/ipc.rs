pub trait IpcApi {
    /// Returns the current CPU load of the process in %.
    fn cpu_load(&self) -> Option<f32>;
    /// Returns the memory usage of the server process in kB.
    fn memory_usage(&self) -> Option<f32>;
    /// Returns the disk usage of the server files in kB.
    fn disk_usage(&self) -> Option<f32>;
}

#[cfg_attr(unix, path = "ipc_unix.rs")]
#[cfg_attr(windows, path = "ipc_windows.rs")]
mod _impl;

pub use _impl::*;
