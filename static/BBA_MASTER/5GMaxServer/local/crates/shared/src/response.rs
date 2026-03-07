use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct StatusResponse {
    pub state: State,
    pub uptime_s: u64,
    pub timestamp: String,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum State {
    Pending = 0,
    Error = 1,
    Ready = 2,
}

impl TryFrom<u8> for State {
    type Error = u8;

    fn try_from(value: u8) -> Result<Self, <Self as TryFrom<u8>>::Error> {
        match value {
            0 => Ok(Self::Pending),
            1 => Ok(Self::Error),
            2 => Ok(Self::Ready),
            e => Err(e),
        }
    }
}

impl From<State> for u8 {
    fn from(value: State) -> u8 {
        value as u8
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct VersionInfo {
    pub state: State,
    pub request_date: std::time::SystemTime,
    pub commit_date: std::time::SystemTime,
    pub last_used_date: std::time::SystemTime,
    pub request_count: u32,
    pub use_counter: u32,
    pub message: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct VersionInfoWithHash {
    pub hash: String,
    pub state: State,
    pub request_date: String,
    pub commit_date: String,
    pub last_used_date: String,
    pub request_count: u32,
    pub use_counter: u32,
    pub message: Option<String>,
}

#[derive(Debug)]
pub struct SimulationInfo {
    pub state: State,
    pub commit_hash: String,
    pub request_date: std::time::SystemTime,
    pub finished_date: std::time::SystemTime,
    pub message: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct SimulationInfoWithHash {
    pub hash: String,
    pub state: State,
    pub commit_hash: String,
    pub request_date: String,
    pub finished_date: String,
}

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq, Eq)]
pub struct ServerStateResponse {
    pub state: State,
    pub message: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SimulationRunResponse {
    pub id: Option<String>,
    #[serde(flatten)]
    pub server_state: ServerStateResponse,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct VersionDeleteResponse {
    pub status: VersionDeleteStatus,
}

#[derive(Debug, Serialize, Deserialize, Clone, Copy, PartialEq, Eq)]
pub enum VersionDeleteStatus {
    NotFound,
    InUse,
    Error,
    Removed,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SimulationResultsResponse {
    pub state: SimulationState,
    pub message: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum SimulationState {
    Pending,
    Error,
    Unknown,
}
