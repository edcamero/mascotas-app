# syntax=docker/dockerfile:1
FROM golang:1.18


WORKDIR /go/src/myapp
COPY . .

ENV GOPATH=/go
ENV GO111MODULE=on
RUN go build main.go
EXPOSE 8080
CMD ["./main"]

