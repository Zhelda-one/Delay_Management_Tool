#!/bin/bash

mkdir -p ~/.ssh

cp /ssh/.ssh/* ~/.ssh/

chmod 400 ~/.ssh/id_ed25519
