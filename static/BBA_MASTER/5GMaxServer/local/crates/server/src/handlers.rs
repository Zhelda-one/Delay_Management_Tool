use crate::actions::*;
use crate::data_types::*;
use crate::utils;
use actix_files::NamedFile;
use actix_multipart::Multipart;
use actix_web::Either;
use actix_web::{web, Error, HttpResponse};
use chrono::Utc;
use futures::{StreamExt, TryStreamExt};
use shared::ServerStateResponse;
use shared::SimulationInfoWithHash;
use shared::SimulationResultsResponse;
use shared::SimulationRunResponse;
use shared::SimulationState;
use shared::State;
use shared::StatusResponse;
use shared::VersionDeleteResponse;
use shared::VersionDeleteStatus;
use shared::VersionInfo;
use shared::VersionInfoWithHash;
use std::io::Write;
use std::path::Path;
use std::path::PathBuf;
use std::sync::Arc;
use std::time::SystemTime;
use std::{fs, thread};
use uuid::Uuid;

pub async fn status(data: web::Data<Arc<SharedData>>) -> HttpResponse {
    let uptime = SystemTime::now()
        .duration_since(data.start_time)
        .unwrap()
        .as_secs();
    let response = StatusResponse {
        state: State::Ready,
        uptime_s: uptime,
        timestamp: utils::system_time_to_rfc3339(SystemTime::now()),
    };

    HttpResponse::Ok().json(response)
}

pub async fn version_list(data: web::Data<Arc<SharedData>>) -> HttpResponse {
    let versions = data.versions.lock().unwrap();
    let versions_list: Vec<_> = versions
        .iter()
        .map(|(hash, info)| VersionInfoWithHash {
            hash: hash.clone(),
            state: info.state,
            request_date: utils::system_time_to_rfc3339(info.request_date),
            commit_date: utils::system_time_to_rfc3339(info.commit_date),
            last_used_date: utils::system_time_to_rfc3339(info.last_used_date),
            request_count: info.request_count,
            use_counter: info.use_counter,
            message: info.message.clone(),
        })
        .collect();

    HttpResponse::Ok().json(versions_list)
}

pub async fn version_delete(
    data: web::Data<Arc<SharedData>>,
    path: web::Path<String>,
) -> HttpResponse {
    let hash = path.into_inner();
    println!("Delete request for hash: {}", hash);

    let mut versions = data.versions.lock().unwrap();
    if !versions.contains_key(&hash) {
        return HttpResponse::NotFound().json(VersionDeleteResponse {
            status: VersionDeleteStatus::NotFound,
        });
    }

    match versions.get(&hash) {
        Some(entry) => {
            if entry.use_counter > 0 {
                return HttpResponse::BadRequest().json(VersionDeleteResponse {
                    status: VersionDeleteStatus::InUse,
                });
            }
        }
        None => {
            return HttpResponse::InternalServerError().json(VersionDeleteResponse {
                status: VersionDeleteStatus::Error,
            });
        }
    }

    match delete_hash(hash.clone()) {
        Ok(_) => {
            versions.remove(&hash);
            HttpResponse::Ok().json(VersionDeleteResponse {
                status: VersionDeleteStatus::Removed,
            })
        }
        Err(e) => {
            println!("Failed to delete hash {}: {}", hash, e);
            HttpResponse::InternalServerError().json(VersionDeleteResponse {
                status: VersionDeleteStatus::Error,
            })
        }
    }
}

pub async fn version_request(
    data: web::Data<Arc<SharedData>>,
    path: web::Path<String>,
) -> HttpResponse {
    let hash = path.into_inner();
    println!("Version request for hash: {}", hash);

    println!("Checking tracking of hash...: {}", hash);
    {
        let mut versions = data.versions.lock().unwrap();

        if let Some(version) = versions.get(&hash){
            match version.state {
                State::Ready | State::Pending => {
                    return HttpResponse::Ok().json(
                        serde_json::to_value(ServerStateResponse {
                            state: State::Ready,
                            message: None,
                        })
                        .unwrap(),
                    )
                }
            
                State::Error => {
                    match delete_hash(hash.clone()) {
                        Ok(_) => {
                            versions.remove(&hash);
                        }
                        Err(e) => {
                            println!("Failed to delete hash {}: {}", hash, e);
                            return HttpResponse::InternalServerError().json(ServerStateResponse {
                                state: State::Error,
                                message: Some(e.to_string()),
                            });
                        }
                    }
                }
            }
        }

        versions.insert(
            hash.clone(),
            VersionInfo {
                state: State::Pending,
                request_date: SystemTime::now(),
                commit_date: SystemTime::now(), // Temporary placeholder
                last_used_date: SystemTime::now(),
                request_count: 0,
                use_counter: 0,
                message: None,
            },
        );
    }

    println!("Hash not tracked. Fetching commit info: {}", hash);
    let commit_date = match utils::git_check_hash(
        Path::new(&data.main_repository.lock().unwrap().clone()),
        &hash,
    ) {
        Ok(commit_date) => commit_date,
        Err(e) => {
            eprintln!("Error checking hash: {}", e);

            let mut versions = data.versions.lock().unwrap();
            versions.remove(&hash);
            return HttpResponse::InternalServerError().json(ServerStateResponse {
                state: State::Error,
                message: Some(e.to_string()),
            });
        }
    };

    println!("Setting commit date {}", hash);
    {
        let mut versions = data.versions.lock().unwrap();
        if let Some(info) = versions.get_mut(&hash) {
            info.commit_date = SystemTime::from(commit_date);
        }
    }

    println!("Spawning build thread {}", hash);
    let shared_data = Arc::clone(&data.get_ref());
    thread::spawn(move || {
        request_hash_thread(shared_data, &hash);
    });

    HttpResponse::Ok().json(ServerStateResponse {
        state: State::Pending,
        message: None,
    })
}

pub async fn simulation_list(data: web::Data<Arc<SharedData>>) -> HttpResponse {
    let shared_data = Arc::clone(&data.get_ref());
    let simulations = shared_data.simulations.lock().unwrap();

    let simulation_list: Vec<_> = simulations
        .iter()
        .map(|(key, value)| SimulationInfoWithHash {
            hash: key.clone(),
            state: value.state,
            request_date: utils::system_time_to_rfc3339(value.request_date),
            commit_hash: value.commit_hash.clone(),
            finished_date: utils::system_time_to_rfc3339(value.finished_date),
        })
        .collect();

    HttpResponse::Ok().json(simulation_list)
}

pub async fn simulation_run(
    data: web::Data<Arc<SharedData>>,
    mut payload: Multipart,
    path: web::Path<String>,
) -> Result<HttpResponse, Error> {
    let hash = path.into_inner();
    println!("Simulation request for hash: {}", hash);

    {
        let mut versions = data.versions.lock().unwrap();
        if let Some(version_info) = versions.get_mut(&hash) {
            if version_info.state != State::Ready {
                return Ok(HttpResponse::BadRequest().json(ServerStateResponse {
                    state: State::Error,
                    message: Some("Version not ready".into()),
                }));
            } else {
                version_info.request_count += 1;
                version_info.last_used_date = SystemTime::now();
            }
        } else {
            return Ok(HttpResponse::BadRequest().json(ServerStateResponse {
                state: State::Error,
                message: Some("Invalid version".into()),
            }));
        }
    }

    let timestamp = Utc::now().format("%Y%m%d%H%M%S").to_string();
    let uuid = Uuid::new_v4().to_string();

    let simulation_id = format!("{}_{}", timestamp, uuid);
    let dirpath = format!("simulations/{}/input/", simulation_id);
    fs::create_dir_all(&dirpath).expect("Failed to create simulation directory");

    let mut config_file_name = None;
    let mut input_file_names = Vec::new();

    println!("Downloading files...");
    while let Ok(Some(mut field)) = payload.try_next().await {
        let fieldname = field.name().unwrap_or("").to_string();
        if fieldname != "zip" {
            continue;
        }

        let filename = field
            .content_disposition()
            .unwrap()
            .get_filename()
            .unwrap()
            .to_string();

        let filepath = format!("{}{}", dirpath, sanitize_filename::sanitize(&filename));

        let filepath_clone = filepath.clone();
        let mut f = web::block(move || std::fs::File::create(filepath_clone.clone()))
            .await
            .unwrap();

        while let Some(chunk) = field.next().await {
            let data = chunk.unwrap();
            {
                let mut file = f.unwrap(); // Unwrap the Result to get the File
                file.write_all(&data)?;
                f = Ok(file);
            }
            f = web::block(move || f).await?;
        }

        // Unzip the downloaded file
        let output = std::process::Command::new("unzip")
            .arg(filepath.clone())
            .arg("-d")
            .arg(&dirpath)
            .output()
            .expect("Failed to unzip file");

        if !output.status.success() {
            return Err(Error::from(std::io::Error::new(
                std::io::ErrorKind::Other,
                "Failed to unzip file",
            )));
        }

        // Iterate over the extracted files
        let paths = std::fs::read_dir(&dirpath).unwrap();
        for path in paths {
            let path = path.unwrap().path();
            if let Some(extension) = path.extension() {
                if extension == "m" {
                    config_file_name =
                        Some(path.file_name().unwrap().to_string_lossy().to_string());
                } else {
                    input_file_names.push(path.file_name().unwrap().to_string_lossy().to_string());
                }
            } else {
                input_file_names.push(path.file_name().unwrap().to_string_lossy().to_string());
            }
        }
    }

    if let Some(config_file) = config_file_name {
        println!(
            "Running simulation thread with input files: {:?} and config file: {}",
            input_file_names, config_file
        );

        let copied_id = simulation_id.clone();
        let shared_data = Arc::clone(&data.get_ref());
        thread::spawn(move || {
            start_simulation_thread(shared_data, &hash, &simulation_id, &config_file);
        });

        Ok(HttpResponse::Ok().json(SimulationRunResponse {
            id: Some(copied_id),
            server_state: ServerStateResponse {
                state: State::Pending,
                message: None,
            },
        }))
    } else {
        Ok(HttpResponse::BadRequest().json(ServerStateResponse {
            state: State::Error,
            message: Some("Missing files".into()),
        }))
    }
}

pub async fn simulation_results(
    data: web::Data<Arc<SharedData>>,
    path: web::Path<String>,
) -> Result<Either<NamedFile, HttpResponse>, Error> {
    let sim_id = path.into_inner();

    let simulations = data.simulations.lock().unwrap();
    if let Some(sim_info) = simulations.get(&sim_id) {
        if sim_info.state == State::Pending {
            return Ok(Either::Right(HttpResponse::NotFound().json(
                SimulationResultsResponse {
                    state: SimulationState::Pending,
                    message: None,
                },
            )));
        } else if sim_info.state == State::Error {
            return Ok(Either::Right(HttpResponse::NotFound().json(
                SimulationResultsResponse {
                    state: SimulationState::Error,
                    message: Some(sim_info.message.clone().unwrap_or_default()),
                },
            )));
        }
    } else {
        return Ok(Either::Right(HttpResponse::NotFound().json(
            SimulationResultsResponse {
                state: SimulationState::Unknown,
                message: None,
            },
        )));
    }

    let zip_path = format!("./simulations/{}/input/Results/Images.zip", sim_id);
    let path: PathBuf = zip_path.parse().expect("Failed to parse path");

    Ok(Either::Left(
        NamedFile::open(path).expect("Failed to open file"),
    ))
}
