package controllers

import (
	"encoding/json"
	"net/http"

	"../db"

	response "../view/"

	"../models"
	"github.com/kataras/iris/v12"
)

func GetUser(ctx iris.Context) {
	//Estructura vacia donde se gurdarán los datos
	user := models.User{}

	// Se obtiene el parametro id de la URL
	id := ctx.Params().Get("id")

	//Conexión a la DB
	db := db.GetConnection()

	defer db.Close()

	// Consulta a la DB - SELECT * FROM contacts WHERE ID = ?
	db.Find(&user, id)

	if user.ID > 0 {
		//Se codifican los datos a formato JSON
		j, _ := json.Marshal(user)
		// Se envian los datos
		response.SendResponse(ctx, http.StatusOK, j)
	} else {
		// Si no existe se envia un error 404
		response.SendErr(ctx, http.StatusNotFound)
	}

}
