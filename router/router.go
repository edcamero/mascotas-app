package router

import (
	Controllers "github.com/edcamero/api-go/controllers"
	"github.com/kataras/iris/v12"
	"github.com/iris-contrib/middleware/jwt"
)



func AddRutas(app *iris.Application) {
	j := jwt.New(jwt.Config{
		// Extract by "token" url parameter.
		Extractor: jwt.FromParameter("token"),
	
		ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
			return []byte("Mascotas unipamplona"), nil
		},
		SigningMethod: jwt.SigningMethodHS256,
	})

	//api := app.Party("/api")

	app.Get("/api/login", Controllers.Login)
	app.Post("/api/adoptante/registrar",Controllers.RegisterAdoptante)

	app.Get("/api/adoptante", j.Serve, Controllers.AuthenticatedAdoptante)
	

	app.Get("/api/user/{id:uint64}", Controllers.GetUser)
	app.Get("/api/user", Controllers.AllUsers)
	app.Post("/api/user", Controllers.StoreUsers)
	app.Put("/api/user/{id:uint64}", Controllers.UpdateUser)
	app.Delete("/api/user/{id:uint64}", Controllers.DeleteUser)

}
