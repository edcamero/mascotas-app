package services

import (
	"errors"
	"mime/multipart"
	"os"
	"path/filepath"
	"strings"

	"github.com/edcamero/api-go/models"
	"github.com/edcamero/api-go/util"
	"github.com/google/uuid"
	"github.com/kataras/iris/v12"
)

const uploadsDir = "./public/uploads/"

type UploadService interface {
	Udpload(ctx iris.Context, info *multipart.FileHeader, subDir string) (models.Foto, error)
}

type uploadService struct {
}

var _ UploadService = (*uploadService)(nil)

func NewUploadservice() UploadService {
	return &uploadService{}
}

func (service uploadService) Udpload(ctx iris.Context, info *multipart.FileHeader, subDir string) (models.Foto, error) {

	var photo models.Foto

	urlDir := filepath.Join(uploadsDir, subDir)

	if _, err := os.Stat(urlDir); errors.Is(err, os.ErrNotExist) {
		err := os.MkdirAll(urlDir, 0700)
		if err != nil {
			return photo, err
		}
	}
	// Create a file with the same name
	// assuming that you have a folder named 'uploads'
	newfileName := strings.Replace(uuid.New().String(), "-", "", -1)
	arrayName := strings.Split(info.Filename, ".")
	fileName := newfileName + "." + arrayName[len(arrayName)-1]
	urlFile := filepath.Join(urlDir, fileName)
	_, err := ctx.SaveFormFile(info, urlFile)

	if err != nil {
		ctx.StatusCode(iris.StatusInternalServerError)
		ctx.Application().Logger().Warnf("Error while preparing the new file: %v", err.Error())
		return photo, err
	}

	photo.Id = newfileName
	photo.Url = util.GetMyServerIP() + urlFile

	return photo, nil

}
