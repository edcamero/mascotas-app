package util

import (
	"fmt"
	"net/smtp"
)

const ServerMails = "smtp.gmail.com"

func sendMail(customerMail string, password string, emailProvider string, mailRecipients []string, body string) {

	auth := smtp.PlainAuth("", customerMail, password, ServerMails)

	msg := []byte(body)
	error := smtp.SendMail(ServerMails+":587", auth, customerMail, mailRecipients, msg)
	if error != nil {
		fmt.Println("Error al enviar correo", error)
	}
}
