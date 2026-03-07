#![allow(dead_code)]

use std::{
    marker::PhantomData,
    ops::Deref,
    sync::atomic::{AtomicI8, AtomicU8, Ordering},
};

use ratatui::text::{Text, ToText};
use shared::{SimulationInfoWithHash, VersionInfoWithHash};

#[derive(Debug)]
#[repr(transparent)]
pub struct OptionalAtomicEnum<E> {
    value: AtomicI8,
    _p: PhantomData<E>,
}

impl<E: Into<u8> + TryFrom<u8>> OptionalAtomicEnum<E> {
    pub fn new(value: E) -> Self {
        Self {
            value: AtomicI8::new(value.into() as i8),
            _p: PhantomData,
        }
    }

    pub fn load(&self, ordering: Ordering) -> Option<E>
    where
        E::Error: std::fmt::Debug,
    {
        let value = self.value.load(ordering);
        if value < 0 {
            None
        } else {
            Some(E::try_from(value as u8).unwrap())
        }
    }

    #[inline(always)]
    pub fn store(&self, value: E, ordering: Ordering) {
        self.value.store(value.into() as i8, ordering);
    }

    pub fn store_optional(&self, value: Option<E>, ordering: Ordering) {
        match value {
            None => self.value.store(-1, ordering),
            Some(value) => self.store(value, ordering),
        }
    }
}

impl<E: TryFrom<u8> + Into<u8>> Default for OptionalAtomicEnum<E> {
    fn default() -> Self {
        Self {
            value: AtomicI8::new(-1),
            _p: PhantomData,
        }
    }
}

#[derive(Debug)]
#[repr(transparent)]
pub struct AtomicEnum<E> {
    value: AtomicU8,
    _p: PhantomData<E>,
}

impl<E: Into<u8> + TryFrom<u8>> AtomicEnum<E> {
    pub fn new(value: E) -> Self {
        Self {
            value: AtomicU8::new(value.into()),
            _p: PhantomData,
        }
    }

    pub fn load(&self, ordering: Ordering) -> E
    where
        E::Error: std::fmt::Debug,
    {
        E::try_from(self.value.load(ordering)).unwrap()
    }

    pub fn store(&self, value: E, ordering: Ordering) {
        self.value.store(value.into(), ordering)
    }
}

pub trait Stateful {
    fn state(&self) -> shared::State;
}

impl Stateful for VersionInfoWithHash {
    fn state(&self) -> shared::State {
        self.state
    }
}

impl Stateful for SimulationInfoWithHash {
    fn state(&self) -> shared::State {
        self.state
    }
}

#[derive(Debug, Clone)]
pub struct TextWrapper<T> {
    value: T,
    conv: fn(&T) -> String,
}

impl<T> TextWrapper<T> {
    pub fn new(value: T, conv: fn(&T) -> String) -> Self {
        Self { value, conv }
    }

    pub fn with_conv(&self, conv: fn(&T) -> String) -> Self
    where
        T: Clone,
    {
        Self::new(self.value.clone(), conv)
    }
}

impl<T> From<T> for TextWrapper<T>
where
    T: ToString,
{
    fn from(value: T) -> Self {
        Self {
            value,
            conv: ToString::to_string,
        }
    }
}

impl<T> Deref for TextWrapper<T> {
    type Target = T;

    fn deref(&self) -> &Self::Target {
        &self.value
    }
}

impl<'w, T> From<&TextWrapper<T>> for Text<'w> {
    fn from(wrapper: &TextWrapper<T>) -> Self {
        Text::from((wrapper.conv)(&wrapper.value))
    }
}

impl<'w, T> From<TextWrapper<T>> for Text<'w> {
    fn from(wrapper: TextWrapper<T>) -> Self {
        Text::from((wrapper.conv)(&wrapper.value))
    }
}

impl<T> ToText for TextWrapper<T> {
    fn to_text(&self) -> Text<'_> {
        self.into()
    }
}

impl<T> Stateful for TextWrapper<T>
where
    T: Stateful,
{
    fn state(&self) -> shared::State {
        self.value.state()
    }
}
