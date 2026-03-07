mod http;
pub use http::*;

mod ipc;
pub use ipc::*;

mod product;
pub use product::*;

use shared::{
    ServerStateResponse, SimulationInfoWithHash, StatusResponse, VersionDeleteResponse,
    VersionInfoWithHash,
};

pub trait Api {
    type Error: std::fmt::Debug;

    fn version_list(&self) -> Result<Vec<VersionInfoWithHash>, Self::Error>;
    fn status(&self) -> Result<StatusResponse, Self::Error>;
    fn simulation_list(&self) -> Result<Vec<SimulationInfoWithHash>, Self::Error>;
    fn version_delete(&self, hash: impl AsRef<str>) -> Result<VersionDeleteResponse, Self::Error>;
    fn version_request(&self, hash: impl AsRef<str>) -> Result<ServerStateResponse, Self::Error>;

    #[cfg(unix)]
    fn get_ipc(&self) -> Option<&dyn IpcApi>;

    #[cfg(windows)]
    fn get_ipc(&self) -> Option<&dyn IpcApi> {
        None
    }

    fn is_ipc_available(&mut self) -> bool {
        self.get_ipc().is_some()
    }
}
