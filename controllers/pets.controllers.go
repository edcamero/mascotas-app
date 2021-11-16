package controllers

import (
	"github.com/edcamero/api-go/models"
	"github.com/edcamero/api-go/services"
	"github.com/kataras/iris/v12"
)

type PetsService struct {
	service services.PetsService
}

func NewPetsController(service services.PetsService) *PetsService {
	return &PetsService{service: service}
}

func (handler *PetsService) GetAll(ctx iris.Context) {
	pets, err := handler.service.GetAll(nil)
	if err != nil {
		ctx.StopWithStatus(iris.StatusInternalServerError)
		return
	}

	if pets == nil {
		// will return "null" if empty, with this "trick" we return "[]" json.
		pets = make([]models.AnimalView, 0)
	}

	ctx.JSON(pets)

}

func (handler *PetsService) GetAllPrivate(ctx iris.Context) {
	pets, err := handler.service.GetAllPrivate(nil)
	if err != nil {
		ctx.StopWithStatus(iris.StatusInternalServerError)
		return
	}

	if pets == nil {
		// will return "null" if empty, with this "trick" we return "[]" json.
		pets = make([]models.Animal, 0)
	}

	ctx.JSON(pets)

}

func (handler *PetsService) GetByID(ctx iris.Context) {
	id := ctx.Params().Get("id")
	pet, err := handler.service.GetByID(nil, id)
	if err != nil {
		ctx.StopWithStatus(iris.StatusNotFound)
		return
	}

	ctx.JSON(pet)

}
