#!/bin/sh

set -xe

runner=${1:-docker}
imagetag=${2:-multi-server}
secrets=${3:-secrets}

knownhosts=$(cat $secrets/known_hosts)
privatekey=$(cat $secrets/caas_git_rsa)
publickey=$(cat $secrets/caas_git_rsa.pub)
caaspass=$(cat $secrets/git-wro-caas-token.txt)

$runner build -t $imagetag .
$runner run -p 9998:9998 -e SSH_KNOWN_HOSTS="$knownhosts" -e SSH_PRIVATEKEY="$privatekey" -e SSH_PUBLICKEY="$publickey" -e CAAS_GIT_PASSWORD="$caaspass" -it $imagetag
