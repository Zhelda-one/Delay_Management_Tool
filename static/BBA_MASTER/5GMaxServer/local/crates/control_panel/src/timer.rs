use std::time::{Duration, Instant};

pub struct Timer {
    f: Box<dyn Fn() + Send + Sync>,
    interval: Duration,
    last_ran: Instant,
}

impl Timer {
    pub fn new<F: Fn() + Send + Sync + 'static>(f: F, interval: Duration) -> Self {
        Self {
            f: Box::new(f),
            interval,
            last_ran: Instant::now(),
        }
    }

    pub fn run(&mut self) -> bool {
        let now = Instant::now();
        let passed = now - self.last_ran;

        if passed < self.interval {
            false
        } else {
            self.last_ran = now;
            (self.f)();
            true
        }
    }
}
