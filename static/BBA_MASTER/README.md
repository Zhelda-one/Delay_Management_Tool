# Baseband Analyzer

Features:
- File type autodetection
- eCPRI dynamic compression/IQ bit width/compression method autodetection during file preload
- eCPRI numerology/max numerology autodetection
- L2L1 version autodetection

# BBA: CLI/NodeJS version

## How to obtain:
1. Download this repository (i.e. git clone https://wrgitlab.int.net.nokia.com/bbanalyzer/bba)
2. Install NodeJS/npm. 

## How to build:
1. Enter project's root directory (contains "package.json" file)
2. Install dependencies with "npm install" (might require to disconnect VPN).
Dependencies are updated rarely. Usually, this step can be skipped on repeated builds.
When running BBA, there should be a message about missing dependencies.
3. Run command "npm run buildNode". As a result, "bba.node.js" should be generated in the root directory, 
which serves as an entry point to the application.

## How to run:
1. Run "node ./bba.node.js <switches_and_arguments_here>"
2. Modify "config.js" to set BBA parameters.
3. Command Line help available with --help switch. (i.e. node ./bba.node.js --help)

## How to update:
1. Update repository (i.e. git pull)
2. Re-build application ("How to build" section)

## Notes:
1. While "configTemplate.js" serves as an overview of all available settings, 
"config.js" can be freely modified.
2. You can remove any unwanted settings from "config.js", which will leave them at default values.
If you add a setting unrecognized by BBA (i.e. typo), there will be a message in a terminal window about it.
