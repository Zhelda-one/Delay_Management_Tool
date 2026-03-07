package main

import (
	"bytes"
	"errors"
	"fmt"
	"os"
	"os/exec"
	"slices"
	"strings"
	"sync"
)

const specRepoURL = "ssh://caas@gerrit.ext.net.nokia.com:29418/MN/HIGHFIVE/3gpp-interfaces-5g-layer-1"
const specRepoPath = "./3gpp-interfaces-5g-layer-1"

const generatorRepoPath = "./multi-gen"

var (
	specRepoLock          sync.Mutex
	availableL2L1Versions []string = []string{}
)

func updateSpecRepo() error {
	specRepoLock.Lock()
	defer specRepoLock.Unlock()

	if !fileExists(specRepoPath) {
		if err := gitClone(specRepoURL, &GitCloneOptions{OutPath: specRepoPath}); err != nil {
			return err
		}
	}

	err := tryRunCommandGoodError(exec.Command("git", "-C", specRepoPath, "fetch", "--tags"))
	if err != nil {
		return err
	}

	cmdOut := bytes.Buffer{}
	cmd := exec.Command("git", "-C", specRepoPath, "tag")
	cmd.Stdout = &cmdOut

	err = tryRunCommandGoodError(cmd)
	if err != nil {
		return err
	}

	tagsStr := strings.TrimSpace(cmdOut.String())
	availableL2L1Versions = strings.Split(tagsStr, "\n")

	return nil
}

const caasGitPasswordEnvName = "CAAS_GIT_PASSWORD"

func updateGeneratorRepo() error {
	pass := os.Getenv(caasGitPasswordEnvName)
	if len(pass) == 0 {
		return fmt.Errorf("no value provided for `%s` environment variable", caasGitPasswordEnvName)
	}

	generatorRepoURL := fmt.Sprintf("https://caas:%s@wrgitlab.int.net.nokia.com/bbanalyzer/bba", pass)

	if !fileExists(generatorRepoPath) {
		if err := gitClone(generatorRepoURL, &GitCloneOptions{
			OutPath: generatorRepoPath,
			Branch:  "multi-gen",
		}); err != nil {
			return err
		}

		return nil
	}

	return tryRunCommandGoodError(exec.Command("git", "-C", generatorRepoPath, "pull"))
}

func isVersionAvailable(version string) bool {
	return slices.Contains(availableL2L1Versions, version)
}

func selectL2L1Version(version string) error {
	tag := fmt.Sprintf("tags/%s", version)
	return tryRunCommandGoodError(exec.Command("git", "-C", specRepoPath, "checkout", tag))
}

func fileExists(path string) bool {
	_, err := os.Stat(path)
	return !errors.Is(err, os.ErrNotExist)
}

func tryRunCommandGoodError(cmd *exec.Cmd) error {
	stderr := bytes.Buffer{}
	cmd.Stderr = &stderr

	err := cmd.Run()
	if err != nil {
		err = errors.Join(fmt.Errorf("subcommand `%s` failed: %s", cmd.String(), err), fmt.Errorf("STDERR: %s", stderr.String()))
	}

	return err
}

func gitClone(url string, opts *GitCloneOptions) error {
	if opts == nil {
		return tryRunCommandGoodError(exec.Command("git", "clone", url))
	}

	cmdArgs := []string{"clone", url}

	if opts.Branch != "" {
		cmdArgs = append(cmdArgs, "-b", opts.Branch)
	}

	if opts.OutPath != "" {
		cmdArgs = append(cmdArgs, opts.OutPath)
	}

	return tryRunCommandGoodError(exec.Command("git", cmdArgs...))
}

type GitCloneOptions struct {
	OutPath string
	Branch  string
}
