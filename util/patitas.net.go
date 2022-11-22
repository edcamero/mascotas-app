package util

import (
	"log"
	"net"
	"os"
)

func GetMyServerIP() string {
	conn, err := net.Dial("udp", "8.8.8.8:80")
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()

	localAddr := conn.LocalAddr().(*net.UDPAddr)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" //localhost
	}
	hostname := "http://localhost:8080/"

	if os.Getenv("ENVIRONMENT_TYPE") != "T" {
		hostname = "http://" + localAddr.IP.String() + ":8080/"
	}
	return hostname
}
