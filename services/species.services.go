package services

import (
	"context"
	"fmt"
	"time"

	"github.com/edcamero/api-go/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type SpeciesService interface {
	GetAll(ctx context.Context) ([]models.Especie, error)
	Save(ctx context.Context, newSpecie *models.NewEspecie) (bool, error)
}

type speciesService struct {
	speciesCollection *mongo.Collection
}

var _ SpeciesService = (*speciesService)(nil)

func NewSpeciesService(collection *mongo.Collection) SpeciesService {
	return &speciesService{speciesCollection: collection}
}

func (service speciesService) GetAll(ctx context.Context) ([]models.Especie, error) {
	findOptions := options.Find()
	cursor, err := service.speciesCollection.Find(ctx, bson.D{}, findOptions)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	defer cursor.Close(ctx)

	var results []models.Especie
	for cursor.Next(ctx) {
		if err = cursor.Err(); err != nil {
			fmt.Println("este error cursor")
			return nil, err
		}
		var elem models.Especie
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

func (service speciesService) Save(ctx context.Context, newSpecie *models.NewEspecie) (bool, error) {
	if newSpecie.ID.IsZero() {
		newSpecie.ID = primitive.NewObjectID()
	}

	newSpecie.CreatedAt = time.Now()
	newSpecie.UpdatedAt = time.Now()
	_, err := service.speciesCollection.InsertOne(ctx, newSpecie)
	if err != nil {
		return false, err
	}
	return true, nil
}
