package services

import (
	"context"

	"github.com/edcamero/api-go/models"
	"github.com/edcamero/api-go/util"
	"github.com/kataras/iris/v12/middleware/jwt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type AuthService interface {
	Login(ctx context.Context, email string, password string) (models.UsuarioLoginResponse, error)
	RefreshToken(ctx context.Context, user models.Claims, refreshToken []byte) (jwt.TokenPair, error)
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
		return userLoginResponse, err
	}
	err = service.userCollection.FindOne(context.TODO(), userCredentials).Decode(&userData)
	if err != nil {
		return userLoginResponse, err
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
