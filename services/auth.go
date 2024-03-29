package services

import (
	"context"
	"errors"
	"fmt"

	"github.com/edcamero/api-go/models"
	"github.com/edcamero/api-go/util"
	"github.com/kataras/iris/v12/middleware/jwt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type AuthService interface {
	Login(ctx context.Context, email string, password string) (models.UsuarioLoginResponse, error)
	RefreshToken(ctx context.Context, user models.Claims, refreshToken []byte) (jwt.TokenPair, error)
	Forgotpassword(ctx context.Context, email string) (bool, error)
}

type authService struct {
	userCollection *mongo.Collection
}

var _ AuthService = (*authService)(nil)

func NewAuthService(collection *mongo.Collection) AuthService {
	return &authService{userCollection: collection}
}

func (service *authService) Login(ctx context.Context, email string, password string) (models.UsuarioLoginResponse, error) {
	userCredentials := bson.M{"email": email, "password": password}
	userExists := bson.M{"email": email}
	userLoginResponse := models.UsuarioLoginResponse{}
	userData := models.UsuarioView{}

	err := service.userCollection.FindOne(context.TODO(), userExists).Decode(&userData)

	if err != nil {
		return userLoginResponse, errors.New("404")
	}

	err = service.userCollection.FindOne(context.TODO(), userCredentials).Decode(&userData)
	if err != nil {
		return userLoginResponse, errors.New("401")
	}
	claims := models.Claims{Id: userData.ID.Hex(), Rol: userData.Rol.Nombre, UserName: userData.UserName, FullName: userData.FullName, Email: userData.Email, ImagePerfil: userData.ImagePerfil}
	token, err := util.GenerateToken(claims)
	if err != nil {
		return userLoginResponse, err
	}
	userLoginResponse.User = userData
	userLoginResponse.Token = token

	return userLoginResponse, err

}

func (service *authService) RefreshToken(ctx context.Context, user models.Claims, refreshToken []byte) (jwt.TokenPair, error) {

	token, err := util.RefreshToken(user, refreshToken)
	return token, err

}

func (service *authService) Forgotpassword(ctx context.Context, email string) (bool, error) {
	userExists := bson.M{"email": email}
	userData := models.UsuarioView{}
	err := service.userCollection.FindOne(context.TODO(), userExists).Decode(&userData)

	if err != nil {
		return false, errors.New("404")
	}

	claims := models.Claims{Id: userData.ID.Hex(), Rol: userData.Rol.Nombre, UserName: userData.UserName, FullName: userData.FullName, Email: userData.Email}
	_, err = util.GenerateToken(claims)

	if err != nil {
		return false, err
	}

	body := fmt.Sprintf("Hello geeks!!!")

	util.SendMail([]string{userData.Email}, body)

	return true, err
}
