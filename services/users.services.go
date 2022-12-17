package services

import (
	"context"
	"fmt"

	"github.com/edcamero/api-go/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type UserService interface {
	GetAllPrivate(ctx context.Context) ([]models.UsuarioList, error)
}
type userService struct {
	usersCollection *mongo.Collection
}

var _ UserService = (*userService)(nil)

func NewUserService(collection *mongo.Collection) UserService {
	return &userService{usersCollection: collection}
}

func (service userService) GetAllPrivate(ctx context.Context) ([]models.UsuarioList, error) {
	findOptions := options.Find()
	cursor, err := service.usersCollection.Find(ctx, bson.D{}, findOptions)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	defer cursor.Close(ctx)

	var results []models.UsuarioList
	for cursor.Next(ctx) {
		if err = cursor.Err(); err != nil {
			fmt.Println("Error en el cursor")
			return nil, err
		}
		var elem models.UsuarioList
		err = cursor.Decode(&elem)
		if err != nil {
			fmt.Println(err)
			fmt.Println(cursor.Current)
			return nil, err
		}
		results = append(results, elem)
	}
	return results, nil
}
