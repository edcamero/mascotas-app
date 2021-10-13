package services

import (
	"context"

	"github.com/edcamero/api-go/models"
	"github.com/edcamero/api-go/util"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type AuthService interface {
	Login(ctx context.Context, email string, password string) (models.UsuarioLoginResponse, error)
}

type userService struct {
	userCollection *mongo.Collection
}

func NewAuthService(collection *mongo.Collection) AuthService {
	return &userService{userCollection: collection}
}

func (service *userService) Login(ctx context.Context, email string, password string) (models.UsuarioLoginResponse, error) {
	userCredentials := bson.M{"email": email, "password": password}
	userExists := bson.M{"email": email}
	userLoginResponse := models.UsuarioLoginResponse{}
	userData := models.UsuarioView{}

	err := service.userCollection.FindOne(context.TODO(), userExists).Decode(&userData)

	if err != nil {
		return userLoginResponse, err
	}

	err = service.userCollection.FindOne(context.TODO(), userCredentials).Decode(&userData)
	if err != nil {
		return userLoginResponse, err
	}
	token, err := util.GenerateToken(userData)
	if err != nil {
		return userLoginResponse, err
	}
	userLoginResponse.User = userData
	userLoginResponse.Token = token
	userLoginResponse.RefreshToken = token

	return userLoginResponse, err

}
