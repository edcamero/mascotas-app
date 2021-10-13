package util

import (
	"time"

	"github.com/edcamero/api-go/environment"
	"github.com/edcamero/api-go/models"
	"github.com/kataras/iris/v12/middleware/jwt"
)

func GenerateToken(user models.UsuarioView) (string, error) {
	secretKey := []byte(environment.SECRETKEY)
	signer := jwt.NewSigner(jwt.HS256, secretKey, 10*time.Minute)
	claims := models.Claims{Id: user.ID.Hex(), Rol: user.Rol.Nombre, UserName: user.UserName}
	token, err := signer.Sign(claims)
	if err != nil {
		return "", err
	}
	return string(token), nil
}
