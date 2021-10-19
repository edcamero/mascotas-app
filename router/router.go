package router

import (
	"fmt"
	"strings"

	"github.com/edcamero/api-go/controllers"
	Controllers "github.com/edcamero/api-go/controllers"
	"github.com/edcamero/api-go/environment"
	"github.com/edcamero/api-go/services"
	"github.com/iris-contrib/middleware/jwt"
	"github.com/kataras/iris/v12"
	"go.mongodb.org/mongo-driver/mongo"
)

func FromAuthHeader(ctx iris.Context) (string, error) {
	authHeader := ctx.GetHeader("Authorization")
	if authHeader == "" {
		return "", nil // No error, just no token
	}

	// TODO: Make this a bit more robust, parsing-wise
	authHeaderParts := strings.Split(authHeader, " ")
	if len(authHeaderParts) != 2 || strings.ToLower(authHeaderParts[0]) != "bearer" {
		return "", fmt.Errorf("Authorization header format must be Bearer {token}")
	}

	return authHeaderParts[1], nil
}

func AddRutas(app *iris.Application, database *mongo.Database) {

	var (
		// Collections.
		usersCollection = database.Collection("usuarios")

		// Services.

		authService = services.NewAuthService(usersCollection)

		authController = controllers.NewAuthController(authService)
	)

	j := jwt.New(jwt.Config{
		// Extract by "token" url parameter.
		//Extractor: jwt.FromParameter("token"),
		Extractor: jwt.FromFirst(FromAuthHeader, jwt.FromParameter("token")),
		ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
			return []byte(environment.SECRETKEY), nil
		},
		SigningMethod: jwt.SigningMethodHS256,
	})

	api := app.Party("/api")
	api.Post("/login", authController.Login)
	//api.Use(util.Verify())
	api.Use(j.Serve)
	api.Get("/refresh", authController.RefreshToken)

	api.Post("/adoptante/registrar", Controllers.RegisterAdoptante)

	adopApi := api.Party("/adoptante")
	adminApi := api.Party(("/admin"), j.Serve, Controllers.AuthenticatedAdmin)

	adopApi.Get("/", Controllers.AuthenticatedAdoptante)

	adminApi.Post("/registrar", Controllers.RegisterAdmin)

	api.Get("/user/{id:uint64}", Controllers.GetUser)
	api.Get("/user", Controllers.AllUsers)
	api.Post("/user", Controllers.StoreUsers)
	api.Put("/user/{id:uint64}", Controllers.UpdateUser)
	api.Delete("/user/{id:uint64}", Controllers.DeleteUser)

}
