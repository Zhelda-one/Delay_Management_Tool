#!/bin/bash

mkdir ~/.ssh

echo "$SSH_KNOWN_HOSTS" > ~/.ssh/known_hosts
echo "$SSH_PRIVATEKEY" > ~/.ssh/id_ed25519
echo "$SSH_PUBLICKEY" > ~/.ssh/id_ed25519.pub

chmod 400 ~/.ssh/id_ed25519

ssh-keyscan -p 29418 gerrit-wrsl1.int.net.nokia.com >> ~/.ssh/known_hosts 2> /dev/null
