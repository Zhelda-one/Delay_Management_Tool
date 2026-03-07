mod actions;
mod data_types;
mod handlers;
mod ipc;
mod utils;

use std::collections::HashMap;
use std::fs;
use std::path::Path;
use std::sync::{Arc, Mutex};
use std::time::SystemTime;

use actix_cors::Cors;
use actix_web::{web, App, HttpServer};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    ipc::init_signal_handler();

    let repo_root = "5gmax";
    let master_dir_name = "_master";
    let master_dir_path = format!("{}/{}", repo_root, master_dir_name);
    let simulations_dir = "simulations";

    // https://gerrit-selfservice.ext.net.nokia.com/url-generator
    //let repo_url = "ssh://banski@gerrit-wrsl1.int.net.nokia.com:29418/MN/5GMAX/5gmax";
    let repo_url = "ssh://caas@gerrit-wrsl1.int.net.nokia.com:29418/MN/5GMAX/5gmax";

    println!("Starting the application...");

    // Ensure the repo_root directory exists
    if !Path::new(repo_root).exists() {
        println!("Creating empty repository root directory...");
        fs::create_dir(repo_root).expect("Failed to create repository root directory");
    }

    // Delete all contents of repo_root except for the master directory
    for entry in fs::read_dir(repo_root).expect("Failed to read repository root directory") {
        let entry = entry.expect("Failed to read directory entry");
        let path = entry.path();
        if path.is_dir() && path.file_name().unwrap() != master_dir_name {
            fs::remove_dir_all(&path).expect("Failed to remove directory");
        } else if path.is_file() {
            fs::remove_file(&path).expect("Failed to remove file");
        }
    }

    // Remove the simulations directory if it exists
    if Path::new(simulations_dir).exists() {
        println!("Removing old simulations directory...");
        fs::remove_dir_all(simulations_dir)
            .expect("Failed to remove existing simulations directory");
    }

    // Create an empty simulations directory
    if !Path::new(simulations_dir).exists() {
        println!("Creating empty simulations directory...");
        fs::create_dir(simulations_dir).expect("Failed to create simulations directory");
    }

    // Check if the repository already exists
    if Path::new(&master_dir_path).exists() {
        // If it exists, fetch new changes
        println!("Fetching new changes...");
        let status_fetch = std::process::Command::new("git")
            .arg("-C")
            .arg(&master_dir_path)
            .arg("fetch")
            .arg("origin")
            .arg("refs/heads/master:refs/remotes/origin/master")
            .status()
            .expect("Failed to fetch from remote repository");

        if !status_fetch.success() {
            eprintln!("Failed to fetch from remote repository");
            return Err(std::io::Error::new(
                std::io::ErrorKind::Other,
                "Failed to fetch from remote repository",
            ));
        }
    } else {
        // Clone the repository
        println!("Cloning the repository...");
        let status_clone = std::process::Command::new("git")
            .arg("clone")
            .arg(repo_url)
            .arg(&master_dir_path)
            .status()
            .expect("Failed to clone repository");

        if !status_clone.success() {
            eprintln!("Failed to clone repository");
            return Err(std::io::Error::new(
                std::io::ErrorKind::Other,
                "Failed to clone repository",
            ));
        }

        // Set the repository to reject pushes
        let status_config = std::process::Command::new("git")
            .arg("-C")
            .arg(&master_dir_path)
            .arg("config")
            .arg("receive.denyCurrentBranch")
            .arg("refuse")
            .status()
            .expect("Failed to set repository configuration");

        if !status_config.success() {
            eprintln!("Failed to set repository configuration");
            return Err(std::io::Error::new(
                std::io::ErrorKind::Other,
                "Failed to set repository configuration",
            ));
        }

        println!("Git config fetch from slave");
        let status = std::process::Command::new("git")
            .arg("-C")
            .arg(&master_dir_path)
            .arg("config")
            .arg("url.\"ssh://caas@gerrit-wrsl1.int.net.nokia.com:29418\".insteadOf")
            .arg("ssh://caas@gerrit.ext.net.nokia.com:29418")
            //.arg("url.\"ssh://banski@gerrit-wrsl1.int.net.nokia.com:29418\".insteadOf")
            //.arg("ssh://banski@gerrit.ext.net.nokia.com:29418")
            .status()
            .expect("Failed to execute git config command");

        if !status.success() {
            eprintln!("git config command failed");
            return Err(std::io::Error::new(
                std::io::ErrorKind::Other,
                "git config command failed",
            ));
        }

        // Pull Git LFS objects
        println!("Installing Git LFS...");
        let status_install = std::process::Command::new("git")
            .arg("-C")
            .arg(&master_dir_path)
            .arg("lfs")
            .arg("install")
            .status()
            .expect("Failed to install Git LFS");

        if !status_install.success() {
            eprintln!("Failed to install Git LFS");
            return Err(std::io::Error::new(
                std::io::ErrorKind::Other,
                "Failed to install Git LFS",
            ));
        }

        println!("Pulling Git LFS objects...");
        let status_pull = std::process::Command::new("git")
            .arg("-C")
            .arg(&master_dir_path)
            .arg("lfs")
            .arg("pull")
            .status()
            .expect("Failed to pull Git LFS objects");

        if !status_pull.success() {
            eprintln!("Failed to pull Git LFS objects");
            return Err(std::io::Error::new(
                std::io::ErrorKind::Other,
                "Failed to pull Git LFS objects",
            ));
        }
    }

    println!("Repository is ready.");

    let shared_data = Arc::new(data_types::SharedData {
        start_time: SystemTime::now(),
        main_repository: Mutex::new(master_dir_path),
        simulations: Mutex::new(HashMap::new()),
        versions: Mutex::new(HashMap::new()),
    });

    println!("Starting the HTTP server...");
    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header()
            .max_age(3600);

        App::new()
            .app_data(web::Data::new(shared_data.clone()))
            .wrap(cors)
            .route("/status", web::get().to(handlers::status))
            .route("/version_list", web::get().to(handlers::version_list))
            .route(
                "/version_request/{hash}",
                web::post().to(handlers::version_request),
            )
            .route(
                "/version_delete/{hash}",
                web::post().to(handlers::version_delete),
            )
            .route("/simulation_list", web::get().to(handlers::simulation_list))
            .route(
                "/simulation_run/{hash}",
                web::post().to(handlers::simulation_run),
            )
            .route(
                "/simulation_results/{sim_id}",
                web::get().to(handlers::simulation_results),
            )
    })
    .bind("0.0.0.0:3200")?
    .run()
    .await
}
