package util

import (
	"fmt"
	"net/smtp"
	"os"
)

func SendMail(mailRecipients []string, body string) {

	auth := smtp.PlainAuth("", os.Getenv("EMAIL_FROM"), os.Getenv("SMTP_PASS"), os.Getenv("SMTP_HOST"))

	fmt.Println(os.Getenv("EMAIL_FROM"))
	fmt.Println(os.Getenv("SMTP_HOST"))
	fmt.Println(os.Getenv("SMTP_PASS"))
	msg := []byte(body)
	error := smtp.SendMail(os.Getenv("SMTP_HOST")+":"+os.Getenv("SMTP_PORT"), auth, os.Getenv("EMAIL_FROM"), mailRecipients, msg)
	if error != nil {
		fmt.Println("Error al enviar correo", error.Error())
	}
}
