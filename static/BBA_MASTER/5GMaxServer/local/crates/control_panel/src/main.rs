use api::{HttpApi, ProductApi};
use panel::Panel;

mod api;
mod panel;
mod panel_command;
mod timer;
mod types;
mod view;
mod widgets;

fn main() {
    let addr = std::env::args()
        .nth(1)
        .unwrap_or("http://localhost:3200".into());
    let is_local = addr.contains("localhost");

    let mut terminal = ratatui::init();
    let http = HttpApi::new(addr);

    #[cfg(unix)]
    {
        if is_local {
            let ipc = api::NamedPipeIpcApi::new("simulationServer").unwrap();
            let product = ProductApi::new(http, ipc);

            let mut panel = Panel::new(product);
            panel.run(&mut terminal).unwrap();
        } else {
            let mut panel = Panel::new(http);
            panel.run(&mut terminal).unwrap();
        }
    }

    #[cfg(windows)]
    {
        let mut panel = Panel::new(http);
        panel.run(&mut terminal).unwrap();
    }

    ratatui::restore();
}
