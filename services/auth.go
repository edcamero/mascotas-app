package services

import (
	"context"

	"github.com/edcamero/api-go/environment"
	"github.com/edcamero/api-go/models"
	"github.com/iris-contrib/middleware/jwt"
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
	token := jwt.NewTokenWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":       userData.ID,
		"rol":      userData.Rol.Nombre,
		"username": userData.UserName,
	})
	tokenString, _ := token.SignedString([]byte(environment.SECRETKEY))
	userLoginResponse.User = userData
	userLoginResponse.Token = tokenString
	userLoginResponse.RefreshToken = tokenString

	return userLoginResponse, err

}
