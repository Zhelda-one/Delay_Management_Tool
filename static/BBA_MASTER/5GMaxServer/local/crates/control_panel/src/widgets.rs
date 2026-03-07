use ratatui::{
    style::{Style, Stylize},
    text::Line,
    widgets::{Block, BorderType, Padding, Paragraph, StatefulWidget, Widget},
};

pub struct Input<'i> {
    title: &'i str,
    border_style: Style,
    border_type: BorderType,
}

impl<'i> Input<'i> {
    pub fn new(title: &'i str) -> Self {
        Self {
            title,
            border_style: Default::default(),
            border_type: Default::default(),
        }
    }
}

#[derive(Debug, Default, Clone)]
pub struct InputState {
    buffer: String,
    pos: usize,
}

impl InputState {
    pub fn set_value(&mut self, value: impl Into<String>) {
        self.buffer = value.into();
    }

    pub fn add_one(&mut self, c: char) {
        self.buffer.insert(self.pos, c);
        self.pos += 1;
    }

    pub fn remove_one(&mut self) {
        if self.buffer.is_empty() {
            return;
        }

        self.pos -= 1;
        self.buffer.remove(self.pos);
    }

    pub fn clear(&mut self) {
        self.buffer.clear();
        self.pos = 0;
    }

    pub fn value(&self) -> &str {
        &self.buffer
    }

    pub fn move_pointer_backward(&mut self) {
        self.pos = self.pos.saturating_sub(1);
    }

    pub fn move_pointer_forward(&mut self) {
        if self.pos < self.buffer.len() {
            self.pos += 1;
        }
    }
}

impl StatefulWidget for Input<'_> {
    type State = InputState;

    fn render(
        self,
        area: ratatui::prelude::Rect,
        buf: &mut ratatui::prelude::Buffer,
        state: &mut Self::State,
    ) {
        let components = if state.pos >= state.buffer.len() {
            vec![state.buffer.as_str().into(), " ".on_white()]
        } else {
            let before = &state.buffer[..state.pos];
            let hl_char = &state.buffer[state.pos..state.pos + 1];
            let after = &state.buffer[state.pos + 1..];

            vec![before.into(), hl_char.black().on_white(), after.into()]
        };

        Paragraph::new(Line::from(components))
            .block(
                Block::bordered()
                    .padding(Padding::left(1))
                    .title_top(self.title)
                    .border_type(self.border_type)
                    .border_style(self.border_style),
            )
            .render(area, buf);
    }
}
