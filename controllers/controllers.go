package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/edcamero/api-go/db"
	"github.com/edcamero/api-go/view"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"

	response "github.com/edcamero/api-go/view"

	"github.com/edcamero/api-go/models"
	"github.com/kataras/iris/v12"
)

//GetUser retorna un usuario
func GetUser(ctx iris.Context) {
	//Estructura vacia donde se gurdarán los datos
	users := models.User{}

	// Se obtiene el parametro id de la URL
	//id := ctx.Params().GetUint64Default("id", 0)

	//Conexión a la DB
	db := db.GetConnection()
	filter := bson.D{}

	collection := db.Database("mascota").Collection("users")
	// Consulta a la DB - SELECT * FROM contacts WHERE ID = ?

	var err = collection.FindOne(context.TODO(), filter).Decode(&users)

	if err != nil {
		log.Fatal(err)
	}

	//Se codifican los datos a formato JSON
	j, _ := json.Marshal(users)
	// Se envian los datos
	response.SendResponse(ctx, http.StatusOK, j)

	// Si no existe se envia un error 404
	//log.Println(users)
	//response.SendErr(ctx, http.StatusNotFound)

}

//AllUsers retorna todos los usuarios
func AllUsers(ctx iris.Context) {
	users := []models.User{}
	db := db.GetConnection()
	filter := bson.D{{}}
	findOptions := options.Find()

	collection := db.Database("mascota").Collection("users")
	// Consulta a la DB - SELECT * FROM contacts WHERE ID = ?

	cur, err := collection.Find(context.TODO(), filter, findOptions)
	if err != nil {
		log.Fatal(err)
	}
	for cur.Next(context.TODO()) {

		// create a value into which the single document can be decoded
		var elem models.User
		err := cur.Decode(&elem)
		if err != nil {
			log.Fatal(err)
		}

		users = append(users, elem)
	}
	cur.Close(context.TODO())
	j, _ := json.Marshal(users)
	// Se envian los datos
	view.SendResponse(ctx, http.StatusOK, j)
}

//StoreUsers almacena un usuario
func StoreUsers(ctx iris.Context) {
	// Estructura donde se gurdaran los datos del body
	user := models.User{}
	//db := db.GetConnection()
	//defer db.Close()
	err := json.NewDecoder(ctx.Request().Body).Decode(&user)
	if err != nil {
		// Sí hay algun error en los datos se devolvera un error 400
		fmt.Println(err)
		view.SendErr(ctx, http.StatusBadRequest)
		return
	}
	//err = db.Create(&user).Error
	if err != nil {
		// Sí hay algun error al guardar los datos se devolvera un error 500
		fmt.Println(err)
		view.SendErr(ctx, http.StatusInternalServerError)
		return
	}
	// Se codifica el nuevo registro y se devuelve
	j, _ := json.Marshal(user)
	view.SendResponse(ctx, http.StatusCreated, j)

}

//UpdateUser actualizar usuario
func UpdateUser(ctx iris.Context) {
	// Estructuras donde se almacenaran los datos
	userFind := models.User{}
	userData := models.User{}
	// Se obtiene el parametro id de la URL
	//id := ctx.Params().Get("id")
	// Conexión a la DB
	//db := db.GetConnection()
	//defer db.Close()
	// Se buscan los datos
	//db.Find(&userFind, id)
	if userFind.ID > 0 {
		// Si existe el registro se decodifican los datos del body
		err := json.NewDecoder(ctx.Request().Body).Decode(&userData)
		if err != nil {
			// Sí hay algun error en los datos se devolvera un error 400
			view.SendErr(ctx, http.StatusBadRequest)
			return
		}
		// Se modifican los datos
		//db.Model(&userFind).Updates(userData)
		// Se codifica el registro modificado y se devuelve
		j, _ := json.Marshal(userFind)
		view.SendResponse(ctx, http.StatusOK, j)
	} else {
		// Sí no existe el registro especificado se devuelde un error 404
		view.SendErr(ctx, http.StatusNotFound)
	}

}

//DeleteUser  elimina un contacto por ID
func DeleteUser(ctx iris.Context) {
	// Estructura donde se guardara el registo buscado
	user := models.User{}
	// Se obtiene el parametro id de la URL
	//id := ctx.Params().Get("id")
	//db := db.GetConnection()

	//db.Find(&user, id)
	if user.ID > 0 {
		// Sí existe, se borra y se envia contenido vacio
		//db.Delete(user)
		view.SendResponse(ctx, http.StatusOK, []byte(`{}`))
	} else {
		// Sí no existe el registro especificado se devuelde un error 404
		view.SendErr(ctx, http.StatusNotFound)
	}
}
