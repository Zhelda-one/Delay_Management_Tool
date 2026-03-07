use reqwest::StatusCode;
use shared::{ServerStateResponse, SimulationInfoWithHash, StatusResponse, VersionDeleteResponse};

use super::{Api, IpcApi};

/// This structure provides a blocking way to talk to the server through it's HTTP API
pub struct HttpApi {
    base_url: String,
}

#[derive(Debug)]
pub enum HttpError {
    Reqwest(reqwest::Error),
    BadStatusCode(StatusCode),
}

pub type HttpResult<T> = Result<T, HttpError>;

fn fetch<T: serde::de::DeserializeOwned>(path: &str) -> HttpResult<T> {
    match reqwest::blocking::get(path) {
        Err(err) => Err(HttpError::Reqwest(err)),
        Ok(resp) => {
            if resp.status().is_success() {
                Ok(resp.json().unwrap())
            } else {
                Err(HttpError::BadStatusCode(resp.status()))
            }
        }
    }
}

impl HttpApi {
    pub fn new(url: impl Into<String>) -> Self {
        Self {
            base_url: url.into(),
        }
    }

    fn request_subpath<T: serde::de::DeserializeOwned>(&self, path: &str) -> HttpResult<T> {
        fetch(&format!("{}/{path}", self.base_url))
    }

    fn post_to_subpath_with_params<'p, T: serde::de::DeserializeOwned>(
        &self,
        path: &str,
        params: impl AsRef<[&'p str]>,
    ) -> HttpResult<T> {
        let mut url = format!("{}/{path}", self.base_url);

        for param in params.as_ref() {
            url.push('/');
            url.push_str(param);
        }

        let client = reqwest::blocking::Client::new();
        let resp = client
            .post(url)
            .send()
            .map_err(HttpError::Reqwest)?;

        if !resp.status().is_success() {
            return Err(HttpError::BadStatusCode(resp.status()));
        }

        Ok(resp.json().unwrap())
    }
}

impl Api for HttpApi {
    type Error = HttpError;

    fn version_list(&self) -> HttpResult<Vec<shared::VersionInfoWithHash>> {
        self.request_subpath("version_list")
    }

    fn status(&self) -> HttpResult<StatusResponse> {
        self.request_subpath("status")
    }

    fn simulation_list(&self) -> Result<Vec<SimulationInfoWithHash>, Self::Error> {
        self.request_subpath("simulation_list")
    }

    fn version_delete(&self, hash: impl AsRef<str>) -> Result<VersionDeleteResponse, Self::Error> {
        self.post_to_subpath_with_params("version_delete", [hash.as_ref()])
    }

    fn version_request(&self, hash: impl AsRef<str>) -> Result<ServerStateResponse, Self::Error> {
        self.post_to_subpath_with_params("version_request", [hash.as_ref()])
    }

    fn get_ipc(&self) -> Option<&dyn IpcApi> {
        None
    }
}
