package main

import (
	"github.com/edcamero/api-go/db"
	"github.com/kataras/iris/v12"
)

func main() {
	app := iris.New()

	app.Logger().SetLevel("debug")
	app.Handle("GET", "/ping", func(ctx iris.Context) {
		ctx.JSON(iris.Map{"message": "hacienod ping"})
	})
	app.Handle("GET", "/", func(ctx iris.Context) {
		ctx.HTML("<h1>Welcome</h1>")
	})

	app.Get("/hello", func(ctx iris.Context) {
		ctx.JSON(iris.Map{"message": "Hello Iris!"})
	})

	app.Get("/migraciones", func(ctx iris.Context) {
		db.MigrateDB()
	})

	AddRutas(app)

	// Listens and serves incoming http requests
	// on http://localhost:8080.
	app.Listen(":8080")
}

func myMiddleware(ctx iris.Context) {
	ctx.Application().Logger().Infof("Runs before %s", ctx.Path())
	ctx.Next()
}
