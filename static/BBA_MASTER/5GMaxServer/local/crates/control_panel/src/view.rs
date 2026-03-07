use std::sync::LazyLock;

use crossterm::event::{KeyCode, KeyEvent, KeyModifiers};
use ratatui::{
    buffer::Buffer,
    layout::{Alignment, Constraint, Direction, Flex, Layout, Rect},
    style::{Color, Style, Stylize},
    text::{Line, Span, Text, ToText},
    widgets::{
        Block, BorderType, List, ListDirection, ListState, Padding, Paragraph, StatefulWidget,
        Widget,
    },
};
use shared::{SimulationInfoWithHash, VersionInfoWithHash};

use crate::{
    panel_command::PanelCommand,
    types::{Stateful, TextWrapper},
    widgets::{Input, InputState},
};

pub trait View {
    type Command;
    type Event;

    fn tooltips(&self) -> Vec<Span<'static>>;
    /// Handles the key event, producing an optional command and optionally updating the UI.
    ///
    /// Returns `(_, true)` if the UI should update, `(_, false)` otherwise.
    fn update(&mut self, event: Self::Event) -> (Option<Self::Command>, bool);

    // NOTE: this is the mix of the `render` methods of the [`Widget`] and [`StatefulWidget`]
    // traits in ratatui, however, the implementors of `Widget` trait cannot be made into a trait
    // object, so we need to duplicate it here. When the `WidgetRef` trait in the ratatui is
    // stable, we can just use it instead.
    fn render(&mut self, area: Rect, buf: &mut Buffer);
}

#[derive(Debug)]
pub struct HomeView;

impl Widget for &HomeView {
    fn render(self, area: Rect, buf: &mut Buffer) {
        Paragraph::new(PLACEHOLDER_TEXT).magenta().render(area, buf)
    }
}

impl View for HomeView {
    type Command = PanelCommand;

    type Event = KeyEvent;

    fn tooltips(&self) -> Vec<Span<'static>> {
        DEFAULT_TOOLTIPS.clone()
    }

    fn update(&mut self, event: Self::Event) -> (Option<Self::Command>, bool) {
        match event.code {
            KeyCode::Char('q') | KeyCode::Esc => (Some(PanelCommand::Exit), true),
            KeyCode::Char('r') => (Some(PanelCommand::DisplayVersionRequestView), true),
            KeyCode::Char('p') => (Some(PanelCommand::Ping), true),
            KeyCode::Char('v') => (Some(PanelCommand::ListVersions), true),
            KeyCode::Char('s') => (Some(PanelCommand::ListSimulations), true),
            _ => (None, false),
        }
    }

    fn render(&mut self, area: Rect, buf: &mut Buffer) {
        Widget::render(&*self, area, buf);
    }
}

#[derive(Debug)]
pub struct ListView<T> {
    title: &'static str,
    items: Vec<T>,
    state: ListState,
    select_item: fn(usize) -> PanelCommand,
}

impl<T> ListView<T> {
    pub fn new(title: &'static str, items: Vec<T>, select_item: fn(usize) -> PanelCommand) -> Self {
        Self {
            title,
            items,
            select_item,
            state: default_list_state(),
        }
    }
}

impl<T> Widget for &mut ListView<T>
where
    T: Stateful + ToText,
{
    fn render(self, area: Rect, buf: &mut Buffer) {
        let [layout] = Layout::new(Direction::Vertical, [Constraint::Percentage(80)])
            .flex(Flex::Center)
            .areas(area);
        let [layout] = Layout::new(Direction::Horizontal, [Constraint::Percentage(80)])
            .flex(Flex::Center)
            .areas(layout);

        let mut g_items = vec![];

        for item in &self.items {
            let prefix = match item.state() {
                shared::State::Ready => Span::from("✓ ").green(),
                shared::State::Pending => Span::from("? ").yellow(),
                shared::State::Error => Span::from("🕱 ").red(),
            };

            let line = Line::from(vec![prefix, Span::raw(item.to_text().to_string())]);
            g_items.push(line);
        }

        let list = List::new(g_items)
            .highlight_symbol("=> ")
            .direction(ListDirection::TopToBottom)
            .highlight_style(Style::new().bold().black().on_white())
            .block(
                Block::bordered()
                    .title_top(
                        Line::from(vec![Span::from(format!(" {} ", self.title)).white()])
                            .centered(),
                    )
                    .border_style(Style::new().fg(Color::Blue)),
            );

        StatefulWidget::render(list, layout, buf, &mut self.state);
    }
}

impl<T> View for ListView<T>
where
    T: Stateful + ToText,
{
    type Command = PanelCommand;

    type Event = KeyEvent;

    fn tooltips(&self) -> Vec<Span<'static>> {
        let mut tooltips = DEFAULT_TOOLTIPS.clone();
        tooltips.extend_from_slice(&["Select ".into(), "<Enter> ".green().bold()]);
        tooltips
    }

    fn update(&mut self, event: Self::Event) -> (Option<Self::Command>, bool) {
        match event.code {
            KeyCode::Esc => (Some(PanelCommand::GetRidOfMe), true),
            KeyCode::Up => {
                self.state.select_previous();
                (None, true)
            }
            KeyCode::Down => {
                self.state.select_next();
                (None, true)
            }
            KeyCode::Enter => {
                if let Some(idx) = self.state.selected() {
                    (Some((self.select_item)(idx)), true)
                } else {
                    (None, false)
                }
            }
            _ => (Some(PanelCommand::NotInterested), false),
        }
    }

    fn render(&mut self, area: Rect, buf: &mut Buffer) {
        Widget::render(self, area, buf);
    }
}

#[derive(Debug, Clone, Copy)]
pub struct LoadingView;

impl Widget for LoadingView {
    fn render(self, area: Rect, buf: &mut Buffer)
    where
        Self: Sized,
    {
        Paragraph::new("Loading, please wait...")
            .centered()
            .render(area, buf)
    }
}

impl View for LoadingView {
    type Command = PanelCommand;

    type Event = KeyEvent;

    fn tooltips(&self) -> Vec<Span<'static>> {
        DEFAULT_TOOLTIPS.clone()
    }

    fn update(&mut self, event: Self::Event) -> (Option<Self::Command>, bool) {
        match event.code {
            KeyCode::Esc => (Some(PanelCommand::GetRidOfMe), true),
            _ => (Some(PanelCommand::NotInterested), true),
        }
    }

    fn render(&mut self, area: Rect, buf: &mut Buffer) {
        Widget::render(*self, area, buf);
    }
}

#[derive(Debug)]
pub struct VersionDetailsView {
    pub version: TextWrapper<VersionInfoWithHash>,
    pub idx: usize,
}

impl Widget for &VersionDetailsView {
    fn render(self, area: Rect, buf: &mut Buffer)
    where
        Self: Sized,
    {
        let text: Text<'_> = TextWrapper::with_conv(&self.version, |ver|
            format!(
                "Request date: {}\nCommit hash: {}\nCommit date: {}\nLast used: {}\nUse count: {}\nRequest count: {}\nState: {:?}",
                ver.request_date,
                ver.hash,
                ver.commit_date,
                ver.last_used_date,
                ver.use_counter,
                ver.request_count,
                ver.state,
            )
        )
        .into();

        Paragraph::new(text)
            .block(
                Block::bordered()
                    .border_type(BorderType::Rounded)
                    .title_top(" Version details ")
                    .title_alignment(Alignment::Center)
                    .padding(Padding::proportional(1)),
            )
            .render(area, buf)
    }
}

impl View for VersionDetailsView {
    type Command = PanelCommand;

    type Event = KeyEvent;

    fn tooltips(&self) -> Vec<Span<'static>> {
        vec![
            " Delete ".into(), "<d> ".green().bold(),
            "Back ".into(), "<Esc> ".green().bold(),
        ]
    }

    fn update(&mut self, event: Self::Event) -> (Option<Self::Command>, bool) {
        match event.code {
            KeyCode::Char('d') => (Some(PanelCommand::DeleteVersion(self.idx as u16)), true),
            KeyCode::Esc => (Some(PanelCommand::GetRidOfMe), true),
            _ => (None, false),
        }
    }

    fn render(&mut self, area: Rect, buf: &mut Buffer) {
        Widget::render(&*self, area, buf);
    }
}

#[derive(Debug)]
pub struct SimulationDetailsView(pub TextWrapper<SimulationInfoWithHash>);

impl Widget for &SimulationDetailsView {
    fn render(self, area: Rect, buf: &mut Buffer)
    where
        Self: Sized,
    {
        let text: Text<'_> = TextWrapper::with_conv(&self.0, |sim| {
            format!(
                "Hash: {}\nRequest date: {}\nFinished date: {}\nCommit hash: {}\nState: {:?}",
                sim.hash, sim.request_date, sim.finished_date, sim.commit_hash, sim.state,
            )
        })
        .into();

        Paragraph::new(text)
            .block(
                Block::bordered()
                    .border_type(BorderType::Rounded)
                    .title_top(" Simulation details ")
                    .title_alignment(Alignment::Center)
                    .padding(Padding::proportional(1)),
            )
            .render(area, buf)
    }
}

impl View for SimulationDetailsView {
    type Command = PanelCommand;

    type Event = KeyEvent;

    fn tooltips(&self) -> Vec<Span<'static>> {
        vec![" Back ".into(), "<Esc> ".green().bold()]
    }

    fn update(&mut self, event: Self::Event) -> (Option<Self::Command>, bool) {
        match event.code {
            KeyCode::Esc => (Some(PanelCommand::GetRidOfMe), true),
            _ => (None, false),
        }
    }

    fn render(&mut self, area: Rect, buf: &mut Buffer) {
        Widget::render(&*self, area, buf);
    }
}

#[derive(Debug, Clone, Copy)]
pub struct VersionDeleteStatusView(pub shared::VersionDeleteStatus);

impl Widget for VersionDeleteStatusView {
    fn render(self, area: Rect, buf: &mut Buffer)
    where
        Self: Sized,
    {
        use shared::VersionDeleteStatus as S;
        let text = match self.0 {
            S::Error => Paragraph::new("Error: could not delete the version").red(),
            S::InUse => {
                Paragraph::new("Error: could not delete the version: currently in use").red()
            }
            S::NotFound => Paragraph::new("Error: could not delete the version: not found").red(),
            S::Removed => Paragraph::new("Successfully removed the version").green(),
        };

        text.block(
            Block::bordered()
                .title_top(" Version delete status ")
                .white()
                .title_alignment(Alignment::Center),
        )
        .render(area, buf)
    }
}

impl View for VersionDeleteStatusView {
    type Command = PanelCommand;

    type Event = KeyEvent;

    fn tooltips(&self) -> Vec<Span<'static>> {
        vec![" Press any key to continue... ".into()]
    }

    fn update(&mut self, _event: Self::Event) -> (Option<Self::Command>, bool) {
        (Some(PanelCommand::GetRidOfMe), true)
    }

    fn render(&mut self, area: Rect, buf: &mut Buffer) {
        Widget::render(*self, area, buf);
    }
}

#[derive(Debug)]
pub struct ConfirmationPopupView<'s, CF, CC>
where
    CF: Fn() -> PanelCommand,
    CC: Fn() -> PanelCommand,
{
    description: Span<'s>,
    on_confirm: CF,
    on_cancel: CC,
    confirm_selected: bool,
}

impl<'s, CF, CC> ConfirmationPopupView<'s, CF, CC>
where
    CF: Fn() -> PanelCommand,
    CC: Fn() -> PanelCommand,
{
    pub fn new(description: impl Into<Span<'s>>, on_confirm: CF, on_cancel: CC) -> Self {
        Self {
            on_confirm,
            on_cancel,
            description: description.into(),
            confirm_selected: false,
        }
    }
}

impl<CF, CC> Widget for &ConfirmationPopupView<'_, CF, CC>
where
    CF: Fn() -> PanelCommand,
    CC: Fn() -> PanelCommand,
{
    fn render(self, area: Rect, buf: &mut Buffer)
    where
        Self: Sized,
    {
        let block = Block::bordered()
            .title_top(" WARNING ")
            .title_style(Style::new().bold().red())
            .title_alignment(Alignment::Center);

        let [message_layout, buttons_layout] = Layout::new(
            Direction::Vertical,
            [Constraint::Percentage(85), Constraint::Fill(1)],
        )
        .areas(block.inner(area));

        let [buttons_layout] = Layout::new(Direction::Horizontal, [Constraint::Percentage(70)])
            .flex(Flex::Center)
            .areas(buttons_layout);

        let [confirm_layout, cancel_layout] = Layout::new(
            Direction::Horizontal,
            [Constraint::Ratio(1, 2), Constraint::Ratio(1, 2)],
        )
        .flex(Flex::SpaceBetween)
        .areas(buttons_layout);

        let confirm_layout = center(confirm_layout);
        let cancel_layout = center(cancel_layout);

        let (confirm_style, cancel_style) = if self.confirm_selected {
            (
                Style::new().on_white().bold().green(),
                Style::new().bold().red(),
            )
        } else {
            (
                Style::new().bold().green(),
                Style::new().on_white().bold().red(),
            )
        };

        block.render(area, buf);

        let message = Line::from(vec![
            "Are you sure you want to ".into(),
            self.description.clone(),
            "?".into(),
        ]);

        message.centered().render(message_layout, buf);

        let button_block = Block::bordered();

        Paragraph::new("<CONFIRM>")
            .style(confirm_style)
            .centered()
            .block(button_block.clone())
            .render(confirm_layout, buf);

        Paragraph::new("<CANCEL>")
            .style(cancel_style)
            .centered()
            .block(button_block)
            .render(cancel_layout, buf);
    }
}

impl<'s, CF, CC> View for ConfirmationPopupView<'s, CF, CC>
where
    CF: Fn() -> PanelCommand,
    CC: Fn() -> PanelCommand,
{
    type Command = PanelCommand;

    type Event = KeyEvent;

    fn tooltips(&self) -> Vec<Span<'static>> {
        vec![" Select ".into(), "<Enter> ".bold().green()]
    }

    fn update(&mut self, event: Self::Event) -> (Option<Self::Command>, bool) {
        match event.code {
            KeyCode::Esc => (Some(PanelCommand::GetRidOfMe), true),
            KeyCode::Enter => {
                let cmd = if self.confirm_selected {
                    (self.on_confirm)()
                } else {
                    (self.on_cancel)()
                };

                (
                    Some(PanelCommand::seq([PanelCommand::GetRidOfMe, cmd])),
                    true,
                )
            }
            KeyCode::Left | KeyCode::Right => {
                self.confirm_selected = !self.confirm_selected;
                (None, true)
            }
            _ => (None, false),
        }
    }

    fn render(&mut self, area: Rect, buf: &mut Buffer) {
        Widget::render(&*self, area, buf);
    }
}

#[derive(Debug, Clone)]
pub struct VersionRequestView {
    input_state: InputState,
}

impl VersionRequestView {
    pub fn new() -> Self {
        Self {
            input_state: Default::default(),
        }
    }
}

impl View for VersionRequestView {
    type Command = PanelCommand;

    type Event = KeyEvent;

    fn tooltips(&self) -> Vec<Span<'static>> {
        vec![
            " Request version ".into(), "<Enter> ".green().bold(),
            "Back ".into(), "<Esc> ".green().bold(),
        ]
    }

    fn update(&mut self, event: Self::Event) -> (Option<Self::Command>, bool) {
        match event.code {
            KeyCode::Esc => (Some(PanelCommand::GetRidOfMe), true),
            KeyCode::Left => {
                self.input_state.move_pointer_backward();
                (None, true)
            }
            KeyCode::Right => {
                self.input_state.move_pointer_forward();
                (None, true)
            }

            KeyCode::Backspace => {
                if event.modifiers.contains(KeyModifiers::CONTROL) {
                    self.input_state.clear();
                } else {
                    self.input_state.remove_one();
                }

                (None, true)
            }
            KeyCode::Char(c) => {
                self.input_state.add_one(c);
                (None, true)
            }
            KeyCode::Enter => (
                Some(PanelCommand::seq([
                    PanelCommand::GetRidOfMe,
                    PanelCommand::RequestVersion(self.input_state.value().to_string()),
                ])),
                true,
            ),
            _ => (None, false),
        }
    }

    fn render(&mut self, area: Rect, buf: &mut Buffer) {
        let input = Input::new(" Version hash ");
        let [input_layout] =
            Layout::new(Direction::Vertical, [Constraint::Percentage(15)]).areas(area);
        input.render(input_layout, buf, &mut self.input_state);
    }
}

pub struct ServerStateView {
    pub title: &'static str,
    pub state: shared::State,
    pub message: Option<String>,
}

impl Widget for &ServerStateView {
    fn render(self, area: Rect, buf: &mut Buffer)
    where
        Self: Sized,
    {
        let block = Block::bordered()
            .border_type(BorderType::Rounded)
            .title_top(self.title)
            .title_alignment(Alignment::Center);

        use shared::State as S;
        let state = Paragraph::new(match self.state {
            S::Error => "Error".bold().red(),
            S::Pending => "Pending".yellow(),
            S::Ready => "Ready".green(),
        });

        let [state_layout, message_layout] = Layout::new(
            Direction::Vertical,
            [Constraint::Fill(1), Constraint::Fill(2)],
        )
        .areas(block.inner(area));

        block.render(area, buf);

        state.centered().render(state_layout, buf);

        if let Some(message) = self.message.as_ref() {
            Paragraph::new(message.as_str())
                .block(Block::bordered().padding(Padding::proportional(1)))
                .render(message_layout, buf);
        }
    }
}

impl View for ServerStateView {
    type Command = PanelCommand;

    type Event = KeyEvent;

    fn tooltips(&self) -> Vec<Span<'static>> {
        vec![" Press any key to continue... ".into()]
    }

    fn update(&mut self, _event: Self::Event) -> (Option<Self::Command>, bool) {
        (Some(PanelCommand::GetRidOfMe), true)
    }

    fn render(&mut self, area: Rect, buf: &mut Buffer) {
        Widget::render(&*self, area, buf);
    }
}

const PLACEHOLDER_TEXT: &str = r#"
                     .^.,*.
                    (   )  )
                   .~       "-._   _.-'-*'-*'-*'-*'-'-.--._
                 /'             `"'                        `.
               _/'                                           `.
          __,""                                                ).--.
       .-'       `._.'                                          .--.\
      '                                                         )   \`:
     ;                                                          ;    "
    :                                                           )
    | 8                                                        ;
     =                  )                                     .
      \                .                                    .'
       `.            ~  \                                .-'
         `-._ _ _ . '    `.          ._        _        |
                           |        /  `"-*--*' |       |
                           |        |           |       :
 ~~~~~~~---   ~-~-~-~   -~-~-~-~-~-~~~~~~  ~~~~  ~-~-~-~-~-~-~-
------~~~~~~~~~----------~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~
 ~~~~~~~~~   ~~~~~~~~~       ~~~~~~~   ~~~~~~~~~  ~~~~~~~~~~~~~~~"#;

static DEFAULT_TOOLTIPS: LazyLock<Vec<Span<'static>>> = LazyLock::new(|| {
    vec![
        " Simulations ".into(),
        "<s> ".green().bold(),
        "Versions ".into(),
        "<v> ".green().bold(),
        "Request version ".into(),
        "<r> ".green().bold(),
        "Ping ".into(),
        "<p> ".green().bold(),
        "Quit ".into(),
        "<q> ".green().bold(),
    ]
});

fn center(rect: Rect) -> Rect {
    let [rect] = Layout::new(Direction::Vertical, [Constraint::Fill(1)])
        .flex(Flex::Center)
        .areas(rect);
    let [rect] = Layout::new(Direction::Horizontal, [Constraint::Fill(1)])
        .flex(Flex::Center)
        .areas(rect);

    rect
}

fn default_list_state() -> ListState {
    let mut state = ListState::default();
    state.select_first();
    state
}
