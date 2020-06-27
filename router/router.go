package router

import (
	"github.com/edcamero/api-go/controllers"
	"github.com/kataras/iris/v12"
)

func AddRutas(app *iris.Application) {

	app.Get("/api/user/{id:uint64}", controllers.GetUser)
	app.Get("/api/user", controllers.AllUsers)
	app.Post("/api/user", controllers.StoreUsers)
	app.Put("/api/user/{id:uint64}", controllers.UpdateUser)
	app.Delete("/api/user/{id:uint64}", controllers.DeleteUser)

}
