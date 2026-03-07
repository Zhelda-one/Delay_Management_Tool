Setup
1. clone 5gmax into local/5gmax
 - direct download through VPN is slow and you may have your access blocked
 - to avoid that, use a mirror generated with https://gerrit-selfservice.ext.net.nokia.com/url-generator
 - select MN/5GMAX/5gmax as repository


Building image (using podman, can be aliased to "docker")
1. Build image
podman build -t mn-l1-as-krk-docker-local.artifactory-espoo2.int.net.nokia.com/node/bba-5gmax/scratch .

2.* Run locally
go to 5GMaxServer directory (where this README.txt file exists) and run from Windows CMD:

podman run -dt --entrypoint /bin/bash -v local:/shared -v %USERPROFILE%\.ssh:/ssh/.ssh:ro -p 3200:3200 mn-l1-as-krk-docker-local.artifactory-espoo2.int.net.nokia.com/node/bba-5gmax/scratch
podman exec -it ID bash

./shared/ssh_init_local.sh
mkdir /local
cd /local

REBUILD (windows-unix file system differences):
cp -rf /shared/* /local/
cargo run --bin simulationServer

3. Push image to artifactory

UPDATE BBA LINKS FROM LOCAL TO GLOBAL
UPDATE REPOSITORY LINK FROM user TO caas

podman push mn-l1-as-krk-docker-local.artifactory-espoo2.int.net.nokia.com/node/bba-5gmax/scratch

