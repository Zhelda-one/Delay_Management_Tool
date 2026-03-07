use std::sync::Mutex;

pub struct SharedData {
    pub start_time: std::time::SystemTime,
    pub main_repository: Mutex<String>,
    pub simulations: Mutex<std::collections::HashMap<String, shared::SimulationInfo>>,
    pub versions: Mutex<std::collections::HashMap<String, shared::VersionInfo>>,
}
