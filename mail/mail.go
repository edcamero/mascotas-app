package util

import (
	"fmt"
	"net/smtp"
	"os"
)

const ServerMails = "smtp.gmail.com"

func SendMail(emailProvider string, mailRecipients []string, body string) {

	auth := smtp.PlainAuth("", os.Getenv("EMAIL_FROM"), os.Getenv("SMTP_PASS"), os.Getenv("SMTP_HOST"))

	msg := []byte(body)
	error := smtp.SendMail(os.Getenv("SMTP_HOST")+":"+os.Getenv("SMTP_PORT"), auth, os.Getenv("EMAIL_FROM"), mailRecipients, msg)
	if error != nil {
		fmt.Println("Error al enviar correo", error)
	}
}
