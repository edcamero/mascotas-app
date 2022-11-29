package controllers

import (
	"log"

	"github.com/edcamero/api-go/models"
	"github.com/edcamero/api-go/services"
	"github.com/kataras/iris/v12"
)

type UserController struct {
	UserServices services.UserService
}

func NewUserController(service services.UserService) *UserController {
	return &UserController{UserServices: service}
}

func (handler *UserController) GetAllPrivate(ctx iris.Context) {
	pets, err := handler.UserServices.GetAllPrivate(nil)
	if err != nil {
		log.Print(err)
		ctx.StopWithStatus(iris.StatusInternalServerError)
		return
	}

	if pets == nil {
		// will return "null" if empty, with this "trick" we return "[]" json.
		pets = make([]models.UsuarioList, 0)
	}

	ctx.JSON(pets)
}
