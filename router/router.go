package router

import (
	"fmt"
	"strings"

	"github.com/edcamero/api-go/controllers"
	Controllers "github.com/edcamero/api-go/controllers"
	"github.com/edcamero/api-go/environment"
	"github.com/edcamero/api-go/services"
	"github.com/edcamero/api-go/util"
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
		usersCollection  = database.Collection("usuarios")
		petsCollection   = database.Collection("animal")
		speciesCollectin = database.Collection("especies")

		// Services.

		authService    = services.NewAuthService(usersCollection)
		petsService    = services.NewPetsService(petsCollection)
		speciesService = services.NewSpeciesService(speciesCollectin)

		//Controllers

		authController    = controllers.NewAuthController(authService)
		petsController    = controllers.NewPetsController(petsService)
		speciesController = controllers.NewSpeciesController(speciesService)
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
	app.HandleDir("/public", iris.Dir("./public"))

	api := app.Party("/api")
	api.Post("/login", authController.Login)
	api.Get("/pets", petsController.GetAll)
	api.Get("/pets/{id:string}", petsController.GetByID)
	api.Use(util.Verify())
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
	// routes pets private

	//pets
	adminApi.Get("/pets", petsController.GetAllPrivate)
	adminApi.Post("/pets", petsController.SavePrivate)
	adminApi.Get("/pets/{id:string}", petsController.GetByIDPrivate)
	//species
	adminApi.Get("/species", speciesController.GetAllPrivate)
	adminApi.Post("/species", speciesController.SavePrivate)
	adminApi.Get("/species/{id:string}", speciesController.GetByID)
	adminApi.Put("/species/{id:string}", speciesController.UpdatedPrivate)
	adminApi.Delete("/species/{id:string}", speciesController.DeletePrivate)
	//pendiente para mejorar
	adminApi.Post("/upload", iris.LimitRequestBodySize(10<<20), services.Udpload)
}
