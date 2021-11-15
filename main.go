package main

import (
	"os"

	"github.com/edcamero/api-go/db"
	"github.com/edcamero/api-go/environment"

	myrouter "github.com/edcamero/api-go/router"
	"github.com/iris-contrib/middleware/cors"

	"github.com/kataras/iris/v12"
)

func main() {
	app := iris.New()
	environment.ReadEnv("")
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" //localhost
	}

	database := db.GetDatabase()

	crs := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"}, // allows everything, use that to change the hosts.
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowCredentials: true,
		AllowedHeaders:   []string{"*"},
	})
	app.UseRouter(crs)
	app.AllowMethods(iris.MethodOptions) // <- permite el Cors

	app.Logger().SetLevel("debug")

	app.Handle("GET", "/ping", func(ctx iris.Context) {
		ctx.JSON(iris.Map{"message": "haciendo ping"})
	})
	app.Handle("GET", "/", func(ctx iris.Context) {
		ctx.HTML("<h1>Welcome</h1>")
	})

	app.Get("/hello", func(ctx iris.Context) {
		ctx.JSON(iris.Map{"message": "Hello Iris!"})
	})

	myrouter.AddRutas(app, database)

	// Listens and serves incoming http requests
	// on http://localhost:8080.
	app.Listen(":" + port)
}

/*func myMiddleware(ctx iris.Context) {
	ctx.Application().Logger().Infof("Runs before %s", ctx.Path())
	ctx.Next()
}*/
