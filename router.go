package main

import (
	"github.com/edcamero/api-go/controllers"
	"github.com/kataras/iris/v12"
)

func AddRutas(app *iris.Application) {
	api := app.Party("/api")

	api.Get("/user/{id:uint64}", controllers.GetUser)
	api.Get("/user", controllers.AllUsers)
	api.Post("/user", controllers.StoreUsers)
	api.Put("/user/{id:uint64}", controllers.UpdateUser)
	api.Delete("/user/{id:uint64}", controllers.DeleteUser)

}
