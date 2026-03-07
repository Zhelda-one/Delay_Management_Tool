use std::io::Write;
use std::process::Stdio;
use std::{env, io};
use std::{fs, path::Path, process::Command, sync::Arc};

use shared::{SimulationInfo, State};

use crate::data_types::*;
use crate::utils::*;

pub fn request_hash_thread(shared: Arc<SharedData>, hash: &str) {
    println!("Requesting hash thread: {}", hash);

    copy_and_build_hash(shared, hash);
    

    set_permissions(hash);

    println!("Finished building hash: {}", hash);
}

fn copy_and_build_hash(shared: Arc<SharedData>, hash: &str) {
    // Copy the repository
    match copy_repository(&shared.main_repository.lock().unwrap(), hash) {
        Ok(_) => {
            println!("Repository copied successfully for hash: {}", hash);
        }
        Err(e) => {
            let mut versions = shared.versions.lock().unwrap();

            if let Some(version_info) = versions.get_mut(hash) {
                version_info.state = State::Error;
                version_info.message = Some("Failed to copy repository".to_string());
            }
            println!("Failed to copy repository for hash: {}. Error: {}", hash, e);
            return;
        }
    }

    println!("Disabling graphical mode.. {}", hash);
    disable_graphical_mode(&hash).expect("Failed to disable graphical mode");

    println!("Building 5gmax.. {}", hash);
    match build_hash(&hash) {
        Ok(_) => {
            let mut versions = shared.versions.lock().unwrap();
            if let Some(version_info) = versions.get_mut(hash) {
                version_info.state = State::Ready;
            }
        }
        Err(e) => {
            println!("Failed to build 5gmax for hash: {}. Error: {}", hash, e);

            let mut versions = shared.versions.lock().unwrap();
            if let Some(version_info) = versions.get_mut(hash) {
                version_info.state = State::Error;
                version_info.message = Some(e);
            }

            return;
        }
    }
}

fn set_permissions(hash: &str) {
    // Grant full access rights to the created directory
    let dir = format!("5gmax/{}", hash);
    let password = "pwd"; // User password, can also be an empty string

    let mut child = Command::new("su")
        .arg("-c")
        .arg(format!("chmod -R g+rwx {}", dir))
        .arg("banski")
        .stdin(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .expect("Failed to execute su command");

    if let Some(mut stdin) = child.stdin.take() {
        stdin
            .write_all(password.as_bytes())
            .expect("Failed to write to stdin");
    }

    println!("Permissions set for directory: {}", dir);
}

pub fn build_hash(hash: &str) -> Result<(), String> {
    let job_number = 3;

    let directory = format!("5gmax/{}/BuildTools", hash);
    let script = format!("su -c \"./build_5gmax.sh -c -j {0} && ./build_5gmax.sh -j {0} --exematlab\" banski", job_number);
    let script_path = format!("{}/build_5gmax.sh", directory);

    // Edit the build_5gmax.sh script
    if let Err(e) = edit_build_script(&script_path) {
        return Err(format!("Failed to edit build script: {}", e));
    }
    
    // Run the shell script and pass the password for user login
    let mut child = Command::new("sh")
        .stdin(Stdio::piped())
        .arg("-c")
        .arg(format!("cd {} && {}", directory, script))
        .stderr(Stdio::piped())
        .spawn()
        .expect("Failed to execute shell script");

    let mut stdin = child.stdin.take().expect("Failed to open stdin");

    // User change requires password, write to child's stdin
    writeln!(stdin, "pwd").expect("Failed to write to child stdin");
    stdin.flush().expect("Failed to write to stdin");

    let output = child.wait_with_output().expect("Failed to wait for child process");
    if output.status.success() {
        Ok(())
    } else {
        let stderr_output = String::from_utf8_lossy(&output.stderr).to_string();
        Err(format!("Build failed: {}", stderr_output))
    }
}

pub fn edit_build_script(script_path: &str) -> io::Result<()> {
    // Read the contents of the script
    let mut script_contents = fs::read_to_string(script_path)?;

    // Replace the specific line
    script_contents = script_contents.replace(
        "JOBS_LIMIT=$((\"${1}\"))",
        "JOBS_LIMIT=$((${1}))",
    );

    // Write the modified contents back to the file
    let mut file = fs::File::create(script_path)?;
    file.write_all(script_contents.as_bytes())?;
    file.flush()?;

    Ok(())
}

#[allow(dead_code)]
pub fn delete_hash(hash: String) -> Result<(), String> {
    let directory = format!("5gmax/{}", hash);

    // Attempt to remove the directory
    fs::remove_dir_all(&directory).map_err(|e| format!("Failed to remove directory: {}", e))?;

    Ok(())
}

struct UseCounterGuard {
    shared: Arc<SharedData>,
    hash: String,
}

impl Drop for UseCounterGuard {
    fn drop(&mut self) {
        let mut versions = self.shared.versions.lock().unwrap();
        if let Some(entry) = versions.get_mut(&self.hash) {
            entry.use_counter -= 1;
        }
    }
}

pub fn start_simulation_thread(
    shared: Arc<SharedData>,
    hash: &str,
    simulation_id: &str,
    input_filename: &str,
) {
    let _counter_guard;
    {
        let mut versions = shared.versions.lock().unwrap();
        if let Some(entry) = versions.get_mut(hash) {
            entry.use_counter += 1;
            _counter_guard = UseCounterGuard {
                shared: Arc::clone(&shared),
                hash: hash.to_string(),
            };
        } else {
            println!("Hash {} not found in versions", hash);
            return;
        }
    }

    {
        let mut simulations = shared.simulations.lock().unwrap();
        simulations.insert(
            simulation_id.to_string(),
            SimulationInfo {
                state: State::Pending,
                commit_hash: hash.to_string(),
                request_date: std::time::SystemTime::now(),
                finished_date: std::time::SystemTime::UNIX_EPOCH,
                message: None,
            },
        );
    }

    // Set environment variables
    let dir = format!("5gmax/{}", hash);
    let abs_dir = fs::canonicalize(&dir)
        .map_err(|e| format!("Failed to get absolute path for path {}: {}", dir, e))
        .expect("Failed to get absolute path");
    let path = format!(
        "{}/opt/Linux64:{}",
        abs_dir.display(),
        env::var("PATH").unwrap_or_default()
    );
    let ld_library_path =
        "/usr/local/MATLAB/R2023b/bin/glnxa64:/usr/local/MATLAB/R2023b/runtime/glnxa64";

    let captures_dir = format!("simulations/{}/input", simulation_id);
    let results_dir = format!("simulations/{}/input/Results", simulation_id);

    // Execute the StartSimulation_f command
    let output = Command::new("StartSimulation_f")
        .current_dir(&captures_dir)
        .arg(&input_filename)
        .env("PATH", path)
        .env("FIVEGMAXROOT", abs_dir)
        .env("LD_LIBRARY_PATH", ld_library_path)
        .stdout(Stdio::inherit())
        .stderr(Stdio::piped())
        .output()
        .expect("Failed to execute StartSimulation_f");

    if output.status.success() {
        println!("Command completed successfully");
    } else {
        eprintln!(
            "Command failed with exit code {}",
            output.status.code().unwrap_or(-1)
        );
    }
    let stderr_output = String::from_utf8_lossy(&output.stderr).to_string();
    // Zip the contents of the Results directory
    let output = Command::new("zip")
        .current_dir(&results_dir)
        .arg("-r")
        .arg("Images.zip")
        .arg(".")
        .output();

    match output {
        Ok(output) => {
            if !output.status.success() {
                eprintln!(
                    "Failed to zip results: {}",
                    String::from_utf8_lossy(&output.stderr)
                );
                let mut simulations = shared.simulations.lock().unwrap();
                if let Some(simulation_info) = simulations.get_mut(simulation_id) {
                    simulation_info.state = State::Error;
                    simulation_info.message = Some(stderr_output);
                }
                return;
            }
        }
        Err(e) => {
            eprintln!("Failed to execute zip command: {}", e);
            let mut simulations = shared.simulations.lock().unwrap();
            if let Some(simulation_info) = simulations.get_mut(simulation_id) {
                simulation_info.state = State::Error;
                simulation_info.message = Some(stderr_output);
            }
            return;
        }
    }

    // On success
    let mut simulations = shared.simulations.lock().unwrap();
    if let Some(simulation_info) = simulations.get_mut(simulation_id) {
        simulation_info.state = State::Ready;
        simulation_info.finished_date = std::time::SystemTime::now();
    }

    println!("Finished simulation thread with hash: {}", hash);
}

pub fn copy_repository(repo_path: &str, hash: &str) -> Result<(), String> {
    println!("Copying the repository.. {}", hash);

    let new_dir = format!("5gmax/{}", hash);

    copy_directory(Path::new(&repo_path), Path::new(&new_dir))?;

    println!("Checking out repository.. {}", hash);

    let output = Command::new("git")
        .arg("-C")
        .arg(&new_dir)
        .arg("checkout")
        .arg(&hash)
        .output()
        .expect("Failed to execute git checkout command");

    if !output.status.success() {
        eprintln!(
            "Failed to checkout hash {}: {}",
            hash,
            String::from_utf8_lossy(&output.stderr)
        );
        return Err(format!("Failed to checkout hash {}", hash).into());
    }

    let directories_to_delete = vec![format!("{}/.git", new_dir)];
    match delete_directories(directories_to_delete) {
        Ok(_) => println!("All specified directories deleted successfully."),
        Err(e) => eprintln!("Error deleting directories: {}", e),
    }

    Ok(())
}

fn delete_directories(directories: Vec<String>) -> Result<(), String> {
    for dir in directories {
        let path = Path::new(&dir);
        if path.exists() {
            if let Err(e) = fs::remove_dir_all(path) {
                eprintln!("Failed to remove directory {}: {}", dir, e);
            } else {
                println!("Successfully removed directory: {}", dir);
            }
        } else {
            println!("Directory does not exist: {}", dir);
        }
    }
    Ok(())
}

fn copy_directory(src: &Path, dst: &Path) -> Result<(), String> {
    if !src.is_dir() {
        return Err(format!("Source path is not a directory: {:?}", src));
    }

    let status = Command::new("cp")
        .arg("-a")
        .arg(src)
        .arg(dst)
        .status()
        .expect("Failed to execute cp command");

    if !status.success() {
        return Err(io::Error::new(io::ErrorKind::Other, "cp -a command failed").to_string());
    }

    let output = Command::new("chmod")
        .arg("-R")
        .arg("g+w")
        .arg(dst)
        .stdout(std::process::Stdio::null())
        .stderr(std::process::Stdio::null())
        .output()
        .map_err(|e| format!("Failed to execute chmod command: {}", e))?;

    if !output.status.success() {
        return Err(format!(
            "chmod command failed with output: {}",
            String::from_utf8_lossy(&output.stderr)
        ));
    }

    Ok(())
}
