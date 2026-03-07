use std::error::Error;
use std::io::Write;
use std::process::Command;
use std::{
    fs::File,
    io::{self, BufRead, BufReader},
    path::Path,
    time::SystemTime,
};

use chrono::{DateTime, Utc};

pub fn git_check_hash(repo_path: &Path, hash: &str) -> Result<DateTime<Utc>, Box<dyn Error>> {
    // Fetch the latest changes from the remote repository
    let status_fetch = Command::new("git")
        .arg("-C")
        .arg(repo_path)
        .arg("fetch")
        .arg("origin")
        .arg("refs/heads/master:refs/remotes/origin/master")
        .status()?;

    if !status_fetch.success() {
        return Err("Failed to fetch from remote repository")?;
    }

    // Check if the commit exists
    let output = Command::new("git")
        .arg("-C")
        .arg(repo_path)
        .arg("cat-file")
        .arg("-t")
        .arg(hash)
        .output()?;

    if !output.status.success() {
        return Err("Commit does not exist")?;
    }

    // Get the commit date
    let output = Command::new("git")
        .arg("-C")
        .arg(repo_path)
        .arg("show")
        .arg("-s")
        .arg("--format=%ct")
        .arg(hash)
        .output()?;

    if !output.status.success() {
        return Err("Failed to get commit date")?;
    }

    let commit_date_str = std::str::from_utf8(&output.stdout).expect("Failed to parse commit date");
    let commit_date = commit_date_str
        .trim()
        .parse::<i64>()
        .expect("Failed to convert commit date to i64");

    let datetime: DateTime<Utc> =
        DateTime::from_timestamp(commit_date, 0).expect("Failed to convert timestamp");

    Ok(datetime)
}

pub fn disable_graphical_mode(hash: &str) -> io::Result<()> {
    let directory = format!("5gmax/{}/", hash);
    let file_path = Path::new(&directory).join("setup/exematlab_sources.cmake");

    if file_path.exists() {
        let file = File::open(file_path.clone())?;
        let reader = BufReader::new(file);
        let mut modified_lines = Vec::new();
        let mut lines: Vec<String> = Vec::new();

        for line in reader.lines() {
            lines.push(line?);
        }

        let mut i = 0;

        while i < lines.len() {
            if lines[i].contains("-R") && i + 1 < lines.len() && lines[i + 1].contains("-nojvm") {
                modified_lines.push(format!("#{}", lines[i]));
                modified_lines.push(format!("#{}", lines[i + 1]));
                i += 2; // Skip the next line as it is already processed
            } else {
                modified_lines.push(lines[i].clone());
                i += 1;
            }
        }

        let mut file = File::create(file_path)?;
        for line in modified_lines {
            writeln!(file, "{}", line)?;
        }
    } else {
        eprintln!("File not found: {}", file_path.display());
    }

    Ok(())
}

pub fn system_time_to_rfc3339(system_time: SystemTime) -> String {
    let datetime: DateTime<Utc> = system_time.into();
    datetime.to_rfc3339()
}
