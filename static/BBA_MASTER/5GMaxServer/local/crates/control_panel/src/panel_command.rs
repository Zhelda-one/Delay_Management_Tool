#[derive(Debug, Default, Clone, PartialEq, Eq)]
#[must_use]
pub enum PanelCommand {
    #[default]
    Ping,

    ListVersions,
    ListSimulations,

    PushLoadingView,

    DisplayVersions,
    DisplaySimulations,
    DisplayVersionDeleteStatus(shared::VersionDeleteStatus),
    DisplayVersionRequestStatus(shared::ServerStateResponse),
    DisplayVersionRequestView,

    RequestVersion(String),

    SelectVersion(u16),
    SelectSimulation(u16),
    DeleteVersion(u16),

    Sequence(Box<[PanelCommand]>),

    GetRidOfMe,
    GoUpdateYourself,
    NotInterested,
    Procrastinate,

    Exit,
}

impl PanelCommand {
    pub fn seq(cmds: impl IntoIterator<Item = PanelCommand>) -> Self {
        Self::Sequence(cmds.into_iter().collect())
    }
}
