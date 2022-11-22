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

type PetsService interface {
	Save(ctx context.Context, newAnimal *models.Animal) (bool, error)
	GetAll(ctx context.Context) ([]models.AnimalView, error)
	GetAllPrivate(ctx context.Context) ([]models.Animal, error)
	GetByID(ctx context.Context, id string) (models.AnimalDetail, error)
	GetByIDPrivate(ctx context.Context, id string) (models.Animal, error)
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
		primitive.E{Key: "fotos", Value: bson.D{primitive.E{Key: "$slice", Value: 1}}},
		primitive.E{Key: "sexo", Value: 1},
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

func (service petsService) Save(ctx context.Context, newAnimal *models.Animal) (bool, error) {
	if newAnimal.ID.IsZero() {
		newAnimal.ID = primitive.NewObjectID()
	}

	newAnimal.CreatedAt = time.Now()
	newAnimal.UpdatedAt = time.Now()
	newAnimal.Score = 0

	_, err := service.animalCollection.InsertOne(ctx, newAnimal)
	if err != nil {
		return false, err
	}
	return true, nil
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

func (service petsService) GetAllPrivate(ctx context.Context) ([]models.Animal, error) {

	findOptions := options.Find()
	cursor, err := service.animalCollection.Find(ctx, bson.D{}, findOptions)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	defer cursor.Close(ctx)

	var results []models.Animal

	for cursor.Next(ctx) {
		if err = cursor.Err(); err != nil {
			fmt.Println("este error cursor")
			return nil, err
		}
		var elem models.Animal
		err = cursor.Decode(&elem)
		fmt.Println(cursor.Current)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}
		results = append(results, elem)
	}
	return results, nil

}

func (service petsService) GetByIDPrivate(ctx context.Context, id string) (models.Animal, error) {
	var petValue models.Animal
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
