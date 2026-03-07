use super::{Api, IpcApi};

use shared::{
    ServerStateResponse, SimulationInfoWithHash, StatusResponse, VersionDeleteResponse,
    VersionInfoWithHash,
};

pub struct ProductApi<A: Api, I: IpcApi> {
    api: A,
    ipc: I,
}

impl<A: Api, I: IpcApi> ProductApi<A, I> {
    pub fn new(api: A, ipc: I) -> Self {
        Self { api, ipc }
    }
}

impl<A: Api, I: IpcApi> Api for ProductApi<A, I> {
    type Error = <A as Api>::Error;

    fn version_list(&self) -> Result<Vec<VersionInfoWithHash>, Self::Error> {
        self.api.version_list()
    }

    fn status(&self) -> Result<StatusResponse, Self::Error> {
        self.api.status()
    }

    fn simulation_list(&self) -> Result<Vec<SimulationInfoWithHash>, Self::Error> {
        self.api.simulation_list()
    }

    fn version_delete(&self, hash: impl AsRef<str>) -> Result<VersionDeleteResponse, Self::Error> {
        self.api.version_delete(hash)
    }

    fn version_request(&self, hash: impl AsRef<str>) -> Result<ServerStateResponse, Self::Error> {
        self.api.version_request(hash)
    }

    fn get_ipc(&self) -> Option<&dyn IpcApi> {
        Some(&self.ipc)
    }
}

impl<A: Api, I: IpcApi> IpcApi for ProductApi<A, I> {
    fn cpu_load(&self) -> Option<f32> {
        self.ipc.cpu_load()
    }

    fn memory_usage(&self) -> Option<f32> {
        self.ipc.memory_usage()
    }

    fn disk_usage(&self) -> Option<f32> {
        self.ipc.disk_usage()
    }
}
