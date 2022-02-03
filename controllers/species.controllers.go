package controllers

import (
	"github.com/edcamero/api-go/models"
	"github.com/edcamero/api-go/services"
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
