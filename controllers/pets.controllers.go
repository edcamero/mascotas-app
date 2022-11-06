package controllers

import (
	"log"
	"path/filepath"

	"github.com/edcamero/api-go/models"
	"github.com/edcamero/api-go/services"
	"github.com/edcamero/api-go/util"
	"github.com/kataras/iris/v12"
)

type PetsService struct {
	service       services.PetsService
	serviceUpload services.UploadService
}

func NewPetsController(service services.PetsService, serviceUpload services.UploadService) *PetsService {
	return &PetsService{service: service, serviceUpload: serviceUpload}
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
		log.Fatal(err)
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
func (handler *PetsService) GetByIDPrivate(ctx iris.Context) {
	id := ctx.Params().Get("id")
	pet, err := handler.service.GetByIDPrivate(nil, id)
	if err != nil {
		ctx.StopWithStatus(iris.StatusNotFound)
		return
	}

	ctx.JSON(pet)
}

func (handler *PetsService) SavePrivate(ctx iris.Context) {

	newPet := new(models.Animal)

	err := ctx.ReadJSON(newPet)

	if err != nil {
		util.FailJSON(ctx, iris.StatusBadRequest, err, "Malformed request payload")
		return
	}

	_, err = handler.service.Save(nil, newPet)

	if err != nil {
		util.InternalServerErrorJSON(ctx, err, "Server was unable to create a pet")
		return
	}

	ctx.StatusCode(iris.StatusCreated)
	ctx.JSON(newPet)
}

func (handler *PetsService) UploadFile(ctx iris.Context) {
	id := ctx.Params().Get("id")
	file, info, err := ctx.FormFile("file")

	defer file.Close()

	if err != nil {
		ctx.StatusCode(iris.StatusInternalServerError)
		ctx.Application().Logger().Warnf("Error while uploading: %v", err.Error())
		return
	}

	photo, err := handler.serviceUpload.Udpload(ctx, info, filepath.Join("pets", id))

	if err != nil {
		ctx.StatusCode(iris.StatusConflict)
		ctx.Application().Logger().Warnf("Error while add file in storage: %v", err.Error())
		return
	}

	err = handler.service.AddPhoto(nil, id, photo)

	if err != nil {
		ctx.StatusCode(iris.StatusConflict)
		ctx.Application().Logger().Warnf("Error while add file in database: %v", err.Error())
		return
	}
	ctx.StatusCode(iris.StatusCreated)
	ctx.JSON(photo)
}

func (handler *PetsService) GetPhotosByID(ctx iris.Context) {
	id := ctx.Params().Get("id")
	photos, err := handler.service.GetPhotosByIDPrivate(nil, id)

	if err != nil {
		log.Println(err)
		ctx.StopWithStatus(iris.StatusNotFound)
		return
	}

	ctx.JSON(photos)
}
