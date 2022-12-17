package controllers

import (
	"github.com/edcamero/api-go/models"
	"github.com/edcamero/api-go/services"
	"github.com/edcamero/api-go/util"
	"github.com/kataras/iris/v12"
)

type AdoptController struct {
	Adoptservice services.AdoptService
	PetsService  services.PetsService
}

func NewAdoptControllerr(Adoptservice services.AdoptService, PetsService services.PetsService) *AdoptController {
	return &AdoptController{Adoptservice: Adoptservice, PetsService: PetsService}
}

func (handler *AdoptController) Count(ctx iris.Context) {
	id := ctx.Params().Get("id")
	count, err := handler.Adoptservice.Count(nil, id)
	if err != nil {
		ctx.StopWithStatus(iris.StatusInternalServerError)
		return
	}
	ctx.JSON(count)
}

func (handler *AdoptController) Save(ctx iris.Context) {
	id := ctx.Params().Get("id")
	newAdopt := new(models.Adoptante)
	err := ctx.ReadJSON(newAdopt)
	if err != nil {
		util.FailJSON(ctx, iris.StatusBadRequest, err, "Malformed request payload")
		return
	}

	_, err = handler.Adoptservice.Save(nil, id, newAdopt)

	if err != nil {
		util.InternalServerErrorJSON(ctx, err, "Server was unable to create a adoption application")
		return
	}

}

func (handler *AdoptController) GetAllPrivate(ctx iris.Context) {

	adopts, err := handler.Adoptservice.GetAllPrivate(nil)

	if err != nil {
		util.InternalServerErrorJSON(ctx, err, "Server was unable to create a adoption application")
		return
	}

	if adopts == nil {
		adopts = make([]models.AdopcionList, 0)
	}

	ctx.JSON(adopts)

}

func (handler *AdoptController) GetByIDPrivate(ctx iris.Context) {
	id := ctx.Params().Get("id")
	adopt, err := handler.Adoptservice.GetByIDPrivate(nil, id)

	if err != nil {
		ctx.StopWithStatus(iris.StatusNotFound)
		return
	}

	ctx.JSON(adopt)

}
