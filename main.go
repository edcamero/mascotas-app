package main

import (
	"github.com/edcamero/api-go/db"
	myrouter "github.com/edcamero/api-go/router"
	"github.com/edcamero/api-go/controllers/auth"
	
	"github.com/kataras/iris/v12"
	"github.com/iris-contrib/middleware/jwt"
	
)

func main() {
	app := iris.New()

	app.Logger().SetLevel("debug")

	j := jwt.New(jwt.Config{
        // Extract by "token" url parameter.
        Extractor: jwt.FromParameter("token"),

        ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
            return []byte("My Secret"), nil
        },
        SigningMethod: jwt.SigningMethodHS256,
	})
	

	app.Handle("GET", "/ping", func(ctx iris.Context) {
		ctx.JSON(iris.Map{"message": "hacienod ping"})
	})
	app.Handle("GET", "/", func(ctx iris.Context) {
		ctx.HTML("<h1>Welcome</h1>")
	})

	app.Get("/hello", func(ctx iris.Context) {
		ctx.JSON(iris.Map{"message": "Hello Iris!"})
	})

	app.Get("/secured", j.Serve, auth.myAuthenticatedHandler)

	app.Get("/migraciones", func(ctx iris.Context) {
		db.MigrateDB()
	})

	myrouter.AddRutas(app)

	// Listens and serves incoming http requests
	// on http://localhost:8080.
	app.Listen(":8080")
}

func myMiddleware(ctx iris.Context) {
	ctx.Application().Logger().Infof("Runs before %s", ctx.Path())
	ctx.Next()
}
