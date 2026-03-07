#!/bin/bash

# This was stolen from the `ssh_init.sh` file of the 5GMax server

set -xe

mkdir ~/.ssh

echo "$SSH_KNOWN_HOSTS" > ~/.ssh/known_hosts
echo "$SSH_PRIVATEKEY" > ~/.ssh/id_ed25519
echo "$SSH_PUBLICKEY" > ~/.ssh/id_ed25519.pub

chmod 400 ~/.ssh/id_ed25519

ssh-keyscan -p 29418 gerrit.ext.net.nokia.com >> ~/.ssh/known_hosts 2> /dev/null
ssh-keyscan wrgitlab.int.net.nokia.com >> ~/.ssh/known_hosts 2> /dev/null

cp -r /server/glue ./glue
cp -r /server/ui ./ui
cp /server/multi-server .

./multi-server
