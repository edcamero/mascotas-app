package controllers

import (
	//"encoding/json"

	"encoding/json"
	"errors"
	"log"
	"time"

	otroJwt "github.com/iris-contrib/middleware/jwt"
	"github.com/kataras/iris/v12"

	"github.com/edcamero/api-go/models"
	"github.com/edcamero/api-go/services"
	"github.com/edcamero/api-go/util"
)

type Token struct {
	TokenUser string `json:"tokenUser"`
}

type AuthService struct {
	service services.AuthService
}

func NewAuthController(service services.AuthService) *AuthService {
	return &AuthService{service: service}
}

func (handler *AuthService) Login(ctx iris.Context) {
	email := ctx.FormValue("email")
	password := util.Encrypt([]byte(ctx.FormValue("password")))
	user, err := handler.service.Login(nil, email, password)
	if err != nil {
		if err.Error() == "404" {
			ctx.StopWithError(iris.StatusNotFound, errors.New("user not found"))
			return
		}
		if err.Error() == "401" {
			ctx.StopWithError(iris.StatusUnauthorized, errors.New("user not authorized"))
			return
		}

		ctx.StopWithStatus(iris.StatusBadRequest)
		return
	}

	ctx.JSON(user)
}

func (handler *AuthService) RefreshToken(ctx iris.Context) {

	refreshToken := []byte(ctx.URLParam("refresh_token"))
	var userClaims models.Claims
	userClaims = GetClaims(ctx)
	tokenPair, err := handler.service.RefreshToken(nil, userClaims, refreshToken)
	if err != nil {
		ctx.StopWithStatus(iris.StatusUnauthorized)
		return
	}
	ctx.JSON(tokenPair)

}

func GetClaims(ctx iris.Context) models.Claims {

	var claims models.Claims
	tokenclaims := ctx.Values().Get("jwt").(*otroJwt.Token)
	claimsMap := tokenclaims.Claims.(otroJwt.MapClaims)
	claims.Id = claimsMap["id"].(string)
	claims.Rol = claimsMap["rol"].(string)
	claims.UserName = claimsMap["username"].(string)
	claims.FullName = claimsMap["fullname"].(string)
	claims.Email = claimsMap["email"].(string)
	claims.ImagePerfil = claimsMap["imagePerfil"].(string)
	return claims
}
func AuthenticatedAdoptante(ctx iris.Context) {

	user := ctx.Values().Get("jwt").(*otroJwt.Token)
	item := user.Claims.(otroJwt.MapClaims)
	if item["rol"] == "adoptante" {
		ctx.Next()
	} else {
		ctx.StopWithStatus(iris.StatusUnauthorized)
	}
}

func AuthenticatedAdmin(ctx iris.Context) {
	//ctx.StopWithStatus(iris.StatusUnauthorized)

	user := ctx.Values().Get("jwt").(*otroJwt.Token)
	item := user.Claims.(otroJwt.MapClaims)
	if item["rol"] == "admin" || float64(time.Now().Unix()) < item["exp"].(float64) {
		ctx.Next()
	} else {
		userJson, _ := json.Marshal(user)
		log.Println(string(userJson))
		ctx.StopWithStatus(iris.StatusUnauthorized)
	}
}

func AuthenticatedFundacion(ctx iris.Context) {
	//ctx.StopWithStatus(iris.StatusUnauthorized)

	user := ctx.Values().Get("jwt").(*otroJwt.Token)
	item := user.Claims.(otroJwt.MapClaims)
	if item["rol"] == "admin" {
		ctx.Next()
	} else {
		ctx.StopWithStatus(iris.StatusUnauthorized)
	}
}

func (handler *AuthService) Forgotpassword(ctx iris.Context) {
	email := ctx.FormValue("email")
	_, err := handler.service.Forgotpassword(nil, email)
	if err != nil {
		if err.Error() == "404" {
			ctx.StopWithError(iris.StatusNotFound, errors.New("email not found"))
			return
		}

		ctx.StopWithStatus(iris.StatusBadRequest)
		return
	}

	ctx.StopWithStatus(iris.StatusOK)
}
