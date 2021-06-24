package controllers

import (
	//"encoding/json"
	"context"
	"log"
	"os"

	"github.com/iris-contrib/middleware/jwt"
	"github.com/kataras/iris/v12"
	"go.mongodb.org/mongo-driver/bson"

	"github.com/edcamero/api-go/db"
	"github.com/edcamero/api-go/environment"
	"github.com/edcamero/api-go/models"
	"github.com/edcamero/api-go/util"
)

type Token struct {
	TokenUser string `json:"tokenUser"`
}

func Login(ctx iris.Context) {

	user := models.UsuarioView{}
	//err := json.NewDecoder(ctx.Request().Body).Decode(&filter)
	email := ctx.FormValue("email")
	password := util.Encrypt([]byte(ctx.FormValue("password")))
	filter := bson.M{"email": email, "password": password}
	userExists := bson.M{"email": email}
	conexion := db.GetConnection()
	collection := conexion.Database(os.Getenv("DATABASE")).Collection("usuarios")
	err := collection.FindOne(context.TODO(), userExists).Decode(&user)

	if err != nil {
		ctx.StopWithStatus(iris.StatusNotFound)
		return
	}

	err = collection.FindOne(context.TODO(), filter).Decode(&user)
	if err != nil {
		log.Println(email)
		log.Println(err)
		ctx.StopWithStatus(iris.StatusUnauthorized)
		return
	} else {
		token := jwt.NewTokenWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"rol":      user.Rol.Nombre,
			"username": user.UserName,
		})
		tokenString, _ := token.SignedString([]byte(environment.SECRETKEY))
		ctx.JSON(iris.Map{"user": user, "token": tokenString})

	}

}

func AuthenticatedAdoptante(ctx iris.Context) {

	user := ctx.Values().Get("jwt").(*jwt.Token)
	item := user.Claims.(jwt.MapClaims)
	if item["rol"] == "adoptante" {
		ctx.Next()
	} else {
		ctx.StopWithStatus(iris.StatusUnauthorized)
	}
}

func AuthenticatedAdmin(ctx iris.Context) {
	//ctx.StopWithStatus(iris.StatusUnauthorized)

	user := ctx.Values().Get("jwt").(*jwt.Token)
	item := user.Claims.(jwt.MapClaims)
	if item["rol"] == "admin" {
		ctx.Next()
	} else {
		ctx.StopWithStatus(iris.StatusUnauthorized)
	}
}

func AuthenticatedFundacion(ctx iris.Context) {
	//ctx.StopWithStatus(iris.StatusUnauthorized)

	user := ctx.Values().Get("jwt").(*jwt.Token)
	item := user.Claims.(jwt.MapClaims)
	if item["rol"] == "admin" {
		ctx.Next()
	} else {
		ctx.StopWithStatus(iris.StatusUnauthorized)
	}
}
