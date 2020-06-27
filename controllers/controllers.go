package controllers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/edcamero/api-go/db"
	"github.com/edcamero/api-go/view"

	response "github.com/edcamero/api-go/view"

	"github.com/edcamero/api-go/models"
	"github.com/kataras/iris/v12"
)

func GetUser(ctx iris.Context) {
	//Estructura vacia donde se gurdarán los datos
	user := models.User{}

	// Se obtiene el parametro id de la URL
	id := ctx.Params().GetUint64Default("id", 0)

	//Conexión a la DB
	db := db.GetConnection()

	defer db.Close()

	// Consulta a la DB - SELECT * FROM contacts WHERE ID = ?
	db.First(&user, id)

	if user.ID > 0 {
		//Se codifican los datos a formato JSON
		j, _ := json.Marshal(user)
		// Se envian los datos
		response.SendResponse(ctx, http.StatusOK, j)
	} else {
		// Si no existe se envia un error 404
		log.Println(user)
		response.SendErr(ctx, http.StatusNotFound)
	}

}

func AllUsers(ctx iris.Context) {
	users := []models.User{}
	db := db.GetConnection()
	defer db.Close()
	db.Find(&users)
	j, _ := json.Marshal(users)
	// Se envian los datos
	view.SendResponse(ctx, http.StatusOK, j)
}

func StoreUsers(ctx iris.Context) {
	// Estructura donde se gurdaran los datos del body
	user := models.User{}
	db := db.GetConnection()
	defer db.Close()
	err := json.NewDecoder(ctx.Request().Body).Decode(&user)
	if err != nil {
		// Sí hay algun error en los datos se devolvera un error 400
		fmt.Println(err)
		view.SendErr(ctx, http.StatusBadRequest)
		return
	}
	err = db.Create(&user).Error
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

func UpdateUser(ctx iris.Context) {
	// Estructuras donde se almacenaran los datos
	userFind := models.User{}
	userData := models.User{}
	// Se obtiene el parametro id de la URL
	id := ctx.Params().Get("id")
	// Conexión a la DB
	db := db.GetConnection()
	defer db.Close()
	// Se buscan los datos
	db.Find(&userFind, id)
	if userFind.ID > 0 {
		// Si existe el registro se decodifican los datos del body
		err := json.NewDecoder(ctx.Request().Body).Decode(&userData)
		if err != nil {
			// Sí hay algun error en los datos se devolvera un error 400
			view.SendErr(ctx, http.StatusBadRequest)
			return
		}
		// Se modifican los datos
		db.Model(&userFind).Updates(userData)
		// Se codifica el registro modificado y se devuelve
		j, _ := json.Marshal(userFind)
		view.SendResponse(ctx, http.StatusOK, j)
	} else {
		// Sí no existe el registro especificado se devuelde un error 404
		view.SendErr(ctx, http.StatusNotFound)
	}

}

// DeleteContact elimina un contacto por ID
func DeleteUser(ctx iris.Context) {
	// Estructura donde se guardara el registo buscado
	user := models.User{}
	// Se obtiene el parametro id de la URL
	id := ctx.Params().Get("id")
	db := db.GetConnection()
	defer db.Close()
	db.Find(&user, id)
	if user.ID > 0 {
		// Sí existe, se borra y se envia contenido vacio
		db.Delete(user)
		view.SendResponse(ctx, http.StatusOK, []byte(`{}`))
	} else {
		// Sí no existe el registro especificado se devuelde un error 404
		view.SendErr(ctx, http.StatusNotFound)
	}
}
