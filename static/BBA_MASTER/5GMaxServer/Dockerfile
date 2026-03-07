FROM fivegmax-docker-local.artifactory-espoo1.int.net.nokia.com/5gmax_container:latest

ENV https_proxy=http://10.158.100.2:8080

RUN apt-get update && apt-get install -y \
    iputils-ping \
    sudo \
    zip \
    curl \
    pkg-config \
    vim

RUN apt-get clean

RUN groupadd ServerGroup
RUN useradd -rm -d /home/banski -s /bin/bash -g ServerGroup -G root -u 1001 banski && echo 'banski:pwd' | chpasswd && adduser banski sudo
RUN useradd -rm -d /home/ServerUser -s /bin/bash -g ServerGroup -G root -u 10001 ServerUser && echo 'ServerUser:pwd' | chpasswd && adduser ServerUser sudo

USER ServerUser

RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

ENV PATH="$PATH:/usr/local/MATLAB/R2023b/bin"

COPY --chown=ServerUser:ServerGroup local /local
RUN chmod -R g+rwx /local

USER ServerUser
WORKDIR /home/ServerUser/

# Retain only last image layers
#FROM scratch 
#COPY --from=0 / /

#ENV MATLAB=/usr/local/MATLAB/R2023b
#ENV PATH=/usr/local/MATLAB/R2023b/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

#ADD --chown=ServerUser:ServerGroup local/auth/id_ed25519 /home/ServerUser/.ssh/id_ed25519
#ADD --chown=ServerUser:ServerGroup local/auth/id_ed25519.pub /home/ServerUser/.ssh/id_ed25519.pub
#ADD --chown=ServerUser:ServerGroup local/auth/known_hosts /home/ServerUser/.ssh/known_hosts

#USER root
#RUN chmod 400 /home/ServerUser/.ssh/id_ed25519

#USER ServerUser
#WORKDIR /home/ServerUser/

