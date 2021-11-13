package services

import (
	"context"
	"fmt"

	"github.com/edcamero/api-go/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type PetsService interface {
	GetAll(ctx context.Context) ([]models.AnimalView, error)
	GetByID(ctx context.Context, id string) (models.AnimalDetail, error)
}

type petsService struct {
	animalCollection *mongo.Collection
}

var _ PetsService = (*petsService)(nil)

func NewPetsService(collection *mongo.Collection) PetsService {
	return &petsService{animalCollection: collection}
}

func (service petsService) GetAll(ctx context.Context) ([]models.AnimalView, error) {

	projection := bson.D{
		primitive.E{Key: "nombre", Value: 1},
		primitive.E{Key: "color", Value: 1},
		primitive.E{Key: "tamaño", Value: 1},
		primitive.E{Key: "esterilizado", Value: 1},
		primitive.E{Key: "descripcion", Value: 1},
		primitive.E{Key: "fecha_nacimiento", Value: 1},
		primitive.E{Key: "especie", Value: 1},
		primitive.E{Key: "fotos", Value: 1},
	}

	findOptions := options.Find().SetProjection(projection)
	cursor, err := service.animalCollection.Find(ctx, bson.D{}, findOptions)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	defer cursor.Close(ctx)

	var results []models.AnimalView

	for cursor.Next(ctx) {
		if err = cursor.Err(); err != nil {
			fmt.Println("este error cursor")
			return nil, err
		}
		var elem models.AnimalView
		err = cursor.Decode(&elem)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}
		results = append(results, elem)
	}
	return results, nil

}

func (service petsService) GetByID(ctx context.Context, id string) (models.AnimalDetail, error) {
	var petValue models.AnimalDetail
	filter, err := matchID(id)
	if err != nil {
		return petValue, err
	}
	err = service.animalCollection.FindOne(ctx, filter).Decode(&petValue)
	if err == mongo.ErrNoDocuments {
		return petValue, err
	}
	return petValue, err

}

func matchID(id string) (bson.D, error) {
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	filter := bson.D{{Key: "_id", Value: objectID}}
	return filter, nil
}
