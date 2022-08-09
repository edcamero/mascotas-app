package controllers

import (
	"github.com/edcamero/api-go/models"
	"github.com/edcamero/api-go/services"
	"github.com/edcamero/api-go/util"
	"github.com/kataras/iris/v12"
)

type SpeciesService struct {
	service services.SpeciesService
}

func NewSpeciesController(service services.SpeciesService) *SpeciesService {
	return &SpeciesService{service: service}
}

func (handler *SpeciesService) GetAllPrivate(ctx iris.Context) {
	species, err := handler.service.GetAll(nil)
	if err != nil {
		ctx.StopWithStatus(iris.StatusInternalServerError)
		return
	}

	if species == nil {
		species = make([]models.Especie, 0)
	}

	ctx.JSON(species)

}

func (handler *SpeciesService) SavePrivate(ctx iris.Context) {

	newSpecie := new(models.NewEspecie)

	err := ctx.ReadJSON(newSpecie)

	if err != nil {
		util.FailJSON(ctx, iris.StatusBadRequest, err, "Malformed request payload")
		return
	}

	_, err = handler.service.Save(nil, newSpecie)

	if err != nil {
		util.InternalServerErrorJSON(ctx, err, "Server was unable to create a specie")
		return
	}

	ctx.StatusCode(iris.StatusCreated)
	ctx.JSON(newSpecie)

}
