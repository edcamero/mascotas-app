package controllers

import (
	"encoding/json"
	"fmt"
	"log"
	"context"
	"encoding/hex"
	"crypto/sha1"
	"time"
	
	
	"github.com/kataras/iris/v12"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"github.com/edcamero/api-go/environment"
	"github.com/edcamero/api-go/db"
	"github.com/edcamero/api-go/models"
	"github.com/edcamero/api-go/view"
)

func RegisterAdoptante(ctx iris.Context){
	user := models.User{}
	rol:=models.Rol{Nombre:"adoptante"}
	err := json.NewDecoder(ctx.Request().Body).Decode(&user)
	user.ID=primitive.NewObjectID()
	user.LastUpdate = time.Now()
	fmt.Println(time.Now())
	user.Rol=rol
	
	if err != nil {
		// Sí hay algun error en los datos se devolvera un error 400
		
		log.Fatal(err)
		//view.SendErr(ctx, http.StatusBadRequest)
		return
	}
	password :=  Encrypt([]byte(user.Password))
	user.Password=password
	//fmt.Println(user)
	conexion := db.GetConnection()
	collection:= conexion.Database(environment.DATABASE).Collection("users")
	_,err = collection.InsertOne(context.TODO(), user)
	if err != nil {
		// Sí hay algun error al guardar los datos se devolvera un error 500
		//fmt.Println(err)
		log.Println(err)
		//ctx.Problem(err)
		//ctx.JSON(err)
		ctx.Problem(view.NewProductProblem("Error en la Base de Datos", "correo ya existe"), iris.ProblemOptions{
			
			JSON: iris.JSON{
				Indent: "  ",
			},
			
			RetryAfter: 300,
		})
	}else{
		ctx.JSON(user)
	}
	// Se codifica el nuevo registro y se devuelve
	


}

func Encrypt(password []byte) string{
	h := sha1.New()
	h.Write(append(password))
	vector:=hex.EncodeToString(h.Sum(nil))
	//vector:=h.Sum([]byte{})
	return string(vector)
}