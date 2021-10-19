package util

import (
	"fmt"
	"time"

	"github.com/edcamero/api-go/environment"
	"github.com/edcamero/api-go/models"
	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/middleware/jwt"
)

const (
	accessTokenMaxTime = 1000 * time.Minute
	refreshTokenMaxAge = 1200 * time.Minute
)

var (
	secretKey = []byte(environment.SECRETKEY)
	signer    = jwt.NewSigner(jwt.HS256, secretKey, accessTokenMaxTime)
	verifier  = jwt.NewVerifier(jwt.HS256, secretKey)
)

func GenerateToken(user models.Claims) (jwt.TokenPair, error) {

	claims := user
	refreshClaims := jwt.Claims{Subject: user.Id}
	tokenPair, err := signer.NewTokenPair(claims, refreshClaims, refreshTokenMaxAge)
	if err != nil {
		fmt.Println(err)
		return tokenPair, err
	}
	return tokenPair, nil
}

func RefreshToken(user models.Claims, refreshToken []byte) (jwt.TokenPair, error) {

	var tokenPair jwt.TokenPair
	_, err := verifier.VerifyToken(refreshToken, jwt.Expected{Subject: user.Id})
	if err != nil {
		return tokenPair, err
	}
	return GenerateToken(user)
}

func Verify() iris.Handler {

	verifier.Extractors = []jwt.TokenExtractor{jwt.FromHeader} // extract token only from Authorization: Bearer $token
	return verifier.Verify(func() interface{} {
		return new(models.Claims)
	})
}

func GetClaims() {

	verifier.Extractors = []jwt.TokenExtractor{jwt.FromHeader} // extract token only from Authorization: Bearer $token
	verifier.Verify(func() interface{} {
		return new(models.Claims)
	})
}
