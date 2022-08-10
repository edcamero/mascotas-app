package services

import (
	"context"
	"fmt"
	"time"

	"github.com/edcamero/api-go/models"
	"github.com/edcamero/api-go/util"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type SpeciesService interface {
	GetAll(ctx context.Context) ([]models.Especie, error)
	Save(ctx context.Context, newSpecie *models.NewEspecie) (bool, error)
	GetByID(ctx context.Context, id string) (models.Especie, error)
	Update(ctx context.Context, id string, specie models.Especie) error
}

type speciesService struct {
	speciesCollection *mongo.Collection
}

var _ SpeciesService = (*speciesService)(nil)

func NewSpeciesService(collection *mongo.Collection) SpeciesService {
	return &speciesService{speciesCollection: collection}
}

func (service speciesService) GetByID(ctx context.Context, id string) (models.Especie, error) {
	var specie models.Especie
	filter, err := matchID(id)
	if err != nil {
		return specie, err
	}
	err = service.speciesCollection.FindOne(ctx, filter).Decode(&specie)
	if err == mongo.ErrNoDocuments {
		return specie, err
	}
	return specie, err

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

func (service speciesService) Update(ctx context.Context, id string, specie models.Especie) error {
	filter, err := matchID(id)
	if err != nil {
		return err
	}
	elem := bson.D{}

	if specie.Nombre != "" {
		elem = append(elem, bson.E{Key: "nombre", Value: specie.Nombre})
	}

	if len(specie.Razas) != 0 {
		elem = append(elem, bson.E{Key: "razas", Value: specie.Razas})
	}

	elem = append(elem, bson.E{Key: "updatedAt", Value: time.Now()})

	updateSpecie := bson.D{
		{Key: "$set", Value: elem},
	}

	_, err = service.speciesCollection.UpdateOne(ctx, filter, updateSpecie)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return util.ErrNotFound
		}
		return err
	}

	return nil
}
