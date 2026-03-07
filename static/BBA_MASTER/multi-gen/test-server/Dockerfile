FROM golang:1.23-bookworm

RUN apt update && apt install -y vim git ca-certificates

COPY src /server/src
COPY scripts /server/scripts
COPY ui /server/ui
COPY glue /server/glue

WORKDIR /server/src

RUN go build -o ../multi-server .

WORKDIR /data

RUN chmod +x /server/scripts/start.sh

ENTRYPOINT ["/server/scripts/start.sh"]
