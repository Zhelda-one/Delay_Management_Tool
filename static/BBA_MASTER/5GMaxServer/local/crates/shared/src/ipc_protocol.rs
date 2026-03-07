use serde::{Deserialize, Serialize};

pub const SERVER_PIPE_NAME: &str = "/tmp/5gmax-server.pipe";
pub const CLIENT_PIPE_NAME: &str = "/tmp/5gmax-client.pipe";

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum ClientMessage {
    GetCpuLoad,
    GetDiskUsage,
    Goodbye,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum ServerMessage {
    SendCpuLoad(f32),
    SendDiskUsage(f32),
}
