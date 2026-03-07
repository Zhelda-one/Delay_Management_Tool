use std::{
    cell::RefCell,
    rc::Rc,
    sync::{
        atomic::{AtomicBool, Ordering},
        mpsc::{self, Receiver, Sender},
        Arc, Weak, Mutex,
    },
    thread::{self, JoinHandle},
    time::{Duration, Instant},
};

use crossterm::event::{self, Event, KeyEvent, KeyEventKind};
use ratatui::{
    buffer::Buffer,
    layout::{Constraint, Direction, Flex, Layout, Rect},
    style::{Color, Stylize},
    text::Line,
    widgets::{Block, BorderType, Padding, Paragraph, Widget},
};
use shared::{SimulationInfoWithHash, StatusResponse, VersionInfoWithHash};

use crate::{
    api::Api,
    panel_command::PanelCommand,
    timer::Timer,
    types::TextWrapper,
    view::{
        ConfirmationPopupView, HomeView, ListView, LoadingView, ServerStateView,
        SimulationDetailsView, VersionDeleteStatusView, VersionDetailsView, VersionRequestView,
        View,
    },
};

const TARGET_FPS: f32 = 60.0;
const ONE_FRAME_TIME_MILLIS: u64 = (1.0 / TARGET_FPS * 1000.0) as u64;
const ONE_FRAME_TIME: Duration = Duration::from_millis(ONE_FRAME_TIME_MILLIS);
const HALF_FRAME_TIME: Duration = Duration::from_millis(ONE_FRAME_TIME_MILLIS / 2);

#[derive(Debug, PartialEq, Eq, Clone)]
enum AsyncAction {
    FetchVersions,
    FetchSimulations,

    PingServer,

    RefreshMetrics,

    TerminateImmediately,

    // could we maybe replace this String by a Cow for more performance?
    DeleteVersion { hash: String },
    RequestVersion { hash: String },
}

type OptionalVec<T> = Option<Vec<T>>;
type PanelView = dyn View<Command = PanelCommand, Event = KeyEvent>;
type RcView = Rc<RefCell<PanelView>>;

#[derive(Debug, Default)]
struct ServerMetrics {
    cpu: Option<f32>,
    ram: Option<f32>,
    disk: Option<f32>,
}

struct SharedPanelState<A: Api> {
    api: A,
    /// This looks like a good use for a [`Mutex`], however, having an [`AtomicBool`] flag provides
    /// more flexibility - some methods may just ignore this flag, and use the api.
    can_use_api: AtomicBool,
    versions: Mutex<OptionalVec<TextWrapper<VersionInfoWithHash>>>,
    simulations: Mutex<OptionalVec<TextWrapper<SimulationInfoWithHash>>>,
    server_status: Mutex<Option<StatusResponse>>,
    timers: Mutex<Vec<Timer>>,
    command_sender: Sender<(PanelCommand, bool)>,
    action_receiver: Mutex<Receiver<AsyncAction>>,
    server_metrics: Mutex<ServerMetrics>,
}

impl<A: Api> SharedPanelState<A> {
    fn ping_server(&self) -> PanelCommand {
        let status_response = self.api.status();
        let mut status = self.server_status.lock().unwrap();
        *status = status_response.ok();

        PanelCommand::GoUpdateYourself
    }

    /// Provides exclusive use of the api.
    ///
    /// If the `can_use_api` field is `true`, calls `f` and returns `true`, otherwise, returns
    /// `false`.
    fn use_api<F>(&self, f: F) -> bool
    where
        F: FnOnce(&A),
    {
        let can_use = self.can_use_api.load(Ordering::Acquire);

        if !can_use {
            false
        } else {
            self.can_use_api.store(false, Ordering::Release);
            f(&self.api);
            self.can_use_api.store(can_use, Ordering::Release);

            true
        }
    }
}

pub struct Panel<A: Api + Send + Sync> {
    state: Arc<SharedPanelState<A>>,
    views: Vec<RcView>,
    // note that this is always the `Some` variant, see
    // `https://users.rust-lang.org/t/spawn-threads-and-join-in-destructor/1613/4` for it's reason
    action_thread: Option<JoinHandle<()>>,
    command_receiver: Receiver<(PanelCommand, bool)>,
    action_sender: Sender<AsyncAction>,
    should_exit: bool,
    should_update: bool,
}

impl<A: Api + Send + Sync + 'static> Panel<A> {
    pub fn new(api: A) -> Self {
        let (thread_sender, panel_receiver) = mpsc::channel();
        let (panel_sender, thread_receiver) = mpsc::channel();

        let state = Arc::new(SharedPanelState {
            api,
            command_sender: thread_sender,
            action_receiver: Mutex::new(thread_receiver),
            can_use_api: AtomicBool::new(true),
            versions: Mutex::new(None),
            simulations: Mutex::new(None),
            timers: Mutex::new(vec![]),
            server_status: Default::default(),
            server_metrics: Default::default(),
        });

        let cloned_state = Arc::clone(&state);
        Self {
            state,
            command_receiver: panel_receiver,
            action_sender: panel_sender,
            action_thread: Some(thread::spawn(move || action_thread_body(cloned_state))),
            should_exit: false,
            should_update: false,
            views: vec![create_view(HomeView)],
        }
    }

    pub fn run(&mut self, term: &mut ratatui::DefaultTerminal) -> std::io::Result<()> {
        // NOTE: it's important to have a weak pointer here, because the timer closure that is
        // capturing this pointer has a `'static` lifetime, meaning that if we use a strong
        // pointer, the panel state will not get dropped after the action thread is finished and
        // the panel itself is dropped!
        let state_weak = Arc::downgrade(&self.state);
        let state = Weak::clone(&state_weak);

        let mut timers = self.state.timers.lock().unwrap();

        let action_sender = self.action_sender.clone();

        timers.push(Timer::new(
            move || {
                if let Some(state) = state.upgrade() {
                    let cmd = state.ping_server();
                    state.command_sender.send((cmd, true)).unwrap();
                }
            },
            Duration::from_secs(5),
        ));

        let state = Weak::clone(&state_weak);

        timers.push(Timer::new(
            move || {
                if let Some(state) = state.upgrade() {
                    action_sender.send(AsyncAction::RefreshMetrics).unwrap();
                }
            },
            Duration::from_secs(5),
        ));

        // explicitly drop the lock, so that the helper thread can access the timers
        drop(timers);

        while !self.should_exit {
            term.draw(|f| f.render_widget(&*self, f.area())).unwrap();

            while !self.dispatch_events()? {
                self.process_queued_commands();

                if self.should_update {
                    self.should_update = false;
                    break;
                }
            }
        }

        self.action_sender
            .send(AsyncAction::TerminateImmediately)
            .unwrap();

        self.action_thread.take().unwrap().join().unwrap();

        Ok(())
    }

    /// Dispatch user events.
    ///
    /// This method polls for events for [`HALF_FRAME_TIME`].
    ///
    /// This method returs `Ok(true)` if the panel needs to be re-rendered, and `Ok(false)`
    /// otherwise.
    fn dispatch_events(&mut self) -> std::io::Result<bool> {
        // poll with early return so we don't block the render loop
        if !event::poll(HALF_FRAME_TIME)? {
            return Ok(false);
        }

        match event::read()? {
            Event::Key(event) => {
                // don't need to handle the release event's ;)
                // NOTE: maybe we should allow views to select which event types would they like
                // to subsribe to? like the observer pattern kinda thing
                if event.kind == KeyEventKind::Release {
                    return Ok(false);
                }

                let view = self.current_view();

                let EventHandlingResult {
                    was_propagated,
                    should_update,
                } = self.handle_event_with_view(view, event);

                if was_propagated {
                    if let Some(result) = self.propagate_event(event) {
                        // we need to respect the need of updating of both views, hence the use of
                        // the `or` operator here
                        return Ok(result.should_update || should_update);
                    }
                }

                Ok(should_update)
            }
            Event::Resize(_, _) => Ok(true),
            _ => Ok(false),
        }
    }

    #[must_use]
    fn propagate_event(&mut self, event: KeyEvent) -> Option<EventHandlingResult> {
        for i in (0..self.views.len() - 1).rev() {
            let view = Rc::clone(&self.views[i]);

            let result @ EventHandlingResult { was_propagated, .. } =
                self.handle_event_with_view(view, event);

            if !was_propagated {
                return Some(result);
            }
        }

        None
    }

    /// This method processes commands enqueued by the other thread for at most [`HALF_FRAME_TIME`].
    fn process_queued_commands(&mut self) {
        let start_time = Instant::now();

        while let Ok((cmd, should_update)) = self.command_receiver.try_recv() {
            self.handle_command(cmd);
            if should_update {
                self.should_update = true;
            }

            if Instant::now() - start_time >= HALF_FRAME_TIME {
                break;
            }
        }
    }

    fn handle_event_with_view(&mut self, view: RcView, event: KeyEvent) -> EventHandlingResult {
        let mut view_mut = view.borrow_mut();
        let (cmd, should_update) = view_mut.update(event);
        drop(view_mut);

        match cmd {
            None => EventHandlingResult {
                should_update,
                was_propagated: false,
            },
            Some(cmd) => {
                let was_propagated = cmd == PanelCommand::NotInterested;
                if !was_propagated {
                    self.handle_command(cmd);
                }

                EventHandlingResult {
                    was_propagated,
                    should_update,
                }
            }
        }
    }

    fn current_view(&self) -> RcView {
        Rc::clone(self.views.last().unwrap())
    }

    fn handle_command(&mut self, cmd: PanelCommand) {
        use PanelCommand as C;
        match cmd {
            C::Procrastinate => {}
            C::Exit => self.should_exit = true,
            C::Ping => self.action_sender.send(AsyncAction::PingServer).unwrap(),
            C::GoUpdateYourself => self.should_update = true,
            C::ListSimulations => {
                self.views.push(create_view(LoadingView));
                self.action_sender
                    .send(AsyncAction::FetchSimulations)
                    .unwrap();
            }
            C::ListVersions => {
                self.views.push(create_view(LoadingView));
                self.action_sender.send(AsyncAction::FetchVersions).unwrap();
            }
            C::DisplayVersionRequestView => {
                self.views.push(create_view(VersionRequestView::new()));
            }
            C::RequestVersion(hash) => {
                self.views.push(create_view(LoadingView));
                self.action_sender
                    .send(AsyncAction::RequestVersion { hash })
                    .unwrap();
            }
            C::DisplayVersionRequestStatus(server_state) => {
                self.views.pop();
                self.views.push(create_view(ServerStateView {
                    title: " Version request ",
                    state: server_state.state,
                    message: server_state.message,
                }));
            }
            C::DisplayVersions => {
                self.views.pop();

                self.views.push(create_view(ListView::new(
                    "Versions",
                    self.state
                        .versions
                        .lock()
                        .unwrap()
                        .as_ref()
                        .cloned()
                        .unwrap_or(vec![]),
                    |idx| PanelCommand::SelectVersion(idx as u16),
                )))
            }
            C::DisplaySimulations => {
                self.views.pop();

                self.views.push(create_view(ListView::new(
                    "Simulations",
                    self.state
                        .simulations
                        .lock()
                        .unwrap()
                        .as_ref()
                        .cloned()
                        .unwrap_or(vec![]),
                    |idx| PanelCommand::SelectSimulation(idx as u16),
                )))
            }
            C::DisplayVersionDeleteStatus(status) => {
                self.views.pop();

                self.views
                    .push(create_view(VersionDeleteStatusView(status)));
            }
            C::SelectVersion(idx) => {
                if let Some(versions) = &*self.state.versions.lock().unwrap() {
                    let idx = idx as usize;

                    let version = versions[idx].clone();
                    self.views
                        .push(Rc::new(RefCell::new(VersionDetailsView { version, idx })));
                }
            }
            C::SelectSimulation(idx) => {
                if let Some(simulations) = &*self.state.simulations.lock().unwrap() {
                    let simulation = simulations[idx as usize].clone();
                    self.views
                        .push(create_view(SimulationDetailsView(simulation)));
                }
            }
            C::DeleteVersion(idx) => {
                let versions = self.state.versions.lock().unwrap();
                let versions = versions.as_ref().unwrap();
                let version = &versions[idx as usize];

                let hash = version.hash.clone();
                let action_sender = self.action_sender.clone();

                self.views.push(create_view(ConfirmationPopupView::new(
                    format!("delete version {hash}"),
                    move || {
                        action_sender
                            .send(AsyncAction::DeleteVersion { hash: hash.clone() })
                            .unwrap();
                        PanelCommand::PushLoadingView
                    },
                    || PanelCommand::Procrastinate,
                )));
            }
            C::Sequence(cmds) => {
                for cmd in cmds {
                    self.handle_command(cmd);
                }
            }
            C::PushLoadingView => {
                self.views.push(create_view(LoadingView));
            }
            C::GetRidOfMe => {
                _ = self.views.pop();
                self.should_update = true;
            }
            C::NotInterested => unreachable!(),
        }
    }
}

struct EventHandlingResult {
    was_propagated: bool,
    should_update: bool,
}

fn create_view<T: View<Command = PanelCommand, Event = KeyEvent> + 'static>(value: T) -> RcView {
    Rc::new(RefCell::new(value))
}

impl<A: Api + Send + Sync + 'static> Widget for &Panel<A> {
    fn render(self, area: Rect, buf: &mut Buffer)
    where
        Self: Sized,
    {
        let current_view = self.current_view();
        let current_view_ref = current_view.borrow();

        let main_block = Block::bordered()
            .border_type(BorderType::Rounded)
            .padding(Padding::uniform(1))
            .white()
            .title(Line::from(" 5GMax server control panel ").centered())
            .title_bottom(Line::from(current_view_ref.tooltips()).centered());

        drop(current_view_ref);

        let [server_status_layout, main_layout] = Layout::new(
            Direction::Horizontal,
            [Constraint::Percentage(15), Constraint::Fill(1)],
        )
        .flex(Flex::Start)
        .areas(main_block.inner(area));

        let [server_state_layout, server_uptime_layout, server_status_layout] = Layout::new(
            Direction::Vertical,
            [
                Constraint::Percentage(12),
                Constraint::Percentage(12),
                Constraint::Fill(1),
            ],
        )
        .flex(Flex::Start)
        .areas(server_status_layout);

        let server_status = self.state.server_status.lock().unwrap();

        let (server_state, server_uptime) = match server_status.as_ref() {
            None => {
                let p = Paragraph::new("Unknown").yellow();
                (p.clone(), p)
            }
            Some(StatusResponse {
                state, uptime_s, ..
            }) => {
                // NOTE: this *should* only be `Ready`, but we should handle other cases too (probably)
                let state = match state {
                    shared::State::Error => Paragraph::new("Error").red(),
                    shared::State::Ready => Paragraph::new("Ready").green(),
                    shared::State::Pending => Paragraph::new("Pending").fg(Color::Rgb(255, 69, 0)),
                };

                let hours = uptime_s / (60 * 60);
                let minutes = uptime_s / 60 - hours * 60;
                let seconds = uptime_s - hours * (60 * 60) - minutes * 60;
                let uptime = Paragraph::new(format!("{hours:02}:{minutes:02}:{seconds:02}"));

                (state, uptime)
            }
        };

        let server_state = server_state
            .centered()
            .block(Block::bordered().border_type(BorderType::Rounded).white());

        let server_uptime = server_uptime
            .centered()
            .block(Block::bordered().border_type(BorderType::Rounded).white());

        // drop the mutex lock here
        drop(server_status);

        main_block.render(area, buf);

        server_state.render(server_state_layout, buf);
        server_uptime.render(server_uptime_layout, buf);

        let [cpu_load_layout, mem_usage_layout, disk_usage_layout] = Layout::new(
            Direction::Vertical,
            [
                Constraint::Percentage(16),
                Constraint::Percentage(16),
                Constraint::Percentage(16),
            ],
        )
            .areas(server_status_layout);

        let metrics = self.state.server_metrics.lock().unwrap();

        let cpu_load = match metrics.cpu {
            None => "--".into(),
            Some(load) => format!("{load:.2}%"),
        };

        let mem_usage = match metrics.ram {
            None => "--".into(),
            Some(mem) => format_kilobytes(mem),
        };

        let disk_usage = match metrics.disk {
            None => "--".into(),
            Some(mem) => format_kilobytes(mem),
        };

        drop(metrics);

        Paragraph::new(format!("{cpu_load} CPU"))
            .centered()
            .block(Block::bordered().border_type(BorderType::Rounded))
            .render(cpu_load_layout, buf);
        Paragraph::new(format!("{mem_usage} RAM"))
            .centered()
            .block(Block::bordered().border_type(BorderType::Rounded))
            .render(mem_usage_layout, buf);
        Paragraph::new(format!("{disk_usage} Disk"))
            .centered()
            .block(Block::bordered().border_type(BorderType::Rounded))
            .render(disk_usage_layout, buf);


        let mut current_view = current_view.borrow_mut();
        current_view.render(main_layout, buf);
    }
}

fn version_info_to_string(info: &VersionInfoWithHash) -> String {
    info.hash.clone()
}

fn simulation_info_to_string(info: &SimulationInfoWithHash) -> String {
    info.hash.clone()
}

fn action_thread_body<A: Api>(state: Arc<SharedPanelState<A>>) {
    loop {
        state
            .timers
            .lock()
            .unwrap()
            .iter_mut()
            .for_each(|t| _ = t.run());

        let receiver = state.action_receiver.lock().unwrap();

        let Ok(action) = receiver.recv_timeout(ONE_FRAME_TIME) else {
            continue;
        };

        match action {
            AsyncAction::TerminateImmediately => break,
            AsyncAction::PingServer => {
                let cmd = state.ping_server();
                // send `false` as an indicator that the panel should not update itself, because
                // the `cmd` returned from the `ping_server` method is a `GoUpdateYourself` command
                state.command_sender.send((cmd, false)).unwrap();
            }
            AsyncAction::RefreshMetrics => {
                if let Some(ipc) = state.api.get_ipc() {
                    let mut metrics = state.server_metrics.lock().unwrap();
                    metrics.cpu = ipc.cpu_load();
                    metrics.ram = ipc.memory_usage();
                    metrics.disk = ipc.disk_usage();
                }
            }
            AsyncAction::FetchSimulations => {
                if !state.use_api(|api| {
                    let mut simulations = state.simulations.lock().unwrap();
                    let simulations_list = api.simulation_list();
                    *simulations = simulations_list.ok().map(|simulations| {
                        simulations
                            .into_iter()
                            .map(|ver| TextWrapper::new(ver, simulation_info_to_string))
                            .collect()
                    });
                }) {
                    continue;
                }

                state
                    .command_sender
                    .send((PanelCommand::DisplaySimulations, true))
                    .unwrap();
            }
            AsyncAction::FetchVersions => {
                if !state.use_api(|api| {
                    let mut versions = state.versions.lock().unwrap();
                    let versions_list = api.version_list();
                    *versions = versions_list.ok().map(|versions| {
                        versions
                            .into_iter()
                            .map(|ver| TextWrapper::new(ver, version_info_to_string))
                            .collect()
                    });
                }) {
                    continue;
                }

                state
                    .command_sender
                    .send((PanelCommand::DisplayVersions, true))
                    .unwrap();
            }
            AsyncAction::DeleteVersion { hash } => {
                if !state.use_api(|api| {
                    let resp = api
                        .version_delete(hash)
                        .unwrap_or(shared::VersionDeleteResponse {
                            status: shared::VersionDeleteStatus::Error,
                        });

                    state
                        .command_sender
                        .send((PanelCommand::DisplayVersionDeleteStatus(resp.status), true))
                        .unwrap();
                }) {
                    continue;
                }
            }
            AsyncAction::RequestVersion { hash } => {
                if !state.use_api(|api| {
                    let resp =
                        api.version_request(&hash)
                            .unwrap_or(shared::ServerStateResponse {
                                state: shared::State::Error,
                                message: None,
                            });

                    state
                        .command_sender
                        .send((PanelCommand::DisplayVersionRequestStatus(resp), true))
                        .unwrap();
                }) {
                    continue;
                }
            }
        }
    }
}

fn format_kilobytes(kilos: f32) -> String {
    if kilos < 1000.0 {
        return format!("{kilos:.2}kB");
    }

    let megs = kilos / 1000.0;
    if megs < 1000.0 {
        return format!("{megs:.2}mB");
    }

    let gigs = megs / 1000.0;
    format!("{gigs:.2}gB")
}
