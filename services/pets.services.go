package services

import (
	"context"
	"fmt"
	"log"
	"strings"
	"time"

	"github.com/edcamero/api-go/models"
	"github.com/edcamero/api-go/util"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type PetsService interface {
	Count(ctx context.Context) (int64, error)
	Save(ctx context.Context, newAnimal *models.Animal) (bool, error)
	GetAll(ctx context.Context, page int64, rango int64) ([]models.AnimalView, error)
	GetAllFilter(ctx context.Context, filter *models.AnimaFilterPublic, page int64, rango int64) ([]models.AnimalView, error)
	GetAllPrivate(ctx context.Context) ([]models.Animal, error)
	GetByID(ctx context.Context, id string) (models.AnimalDetail, error)
	GetByIDPrivate(ctx context.Context, id string) (models.Animal, error)
	AddPhoto(ctx context.Context, id string, photo models.Foto) error
	AddPeso(ctx context.Context, id string, newPeso *models.ControlPeso) error
	GetPhotosByIDPrivate(ctx context.Context, id string) ([]models.Foto, error)
	GetClue(adopt *models.AdoptanteClue) (models.AnimalDetail, error)
}

type petsService struct {
	animalCollection *mongo.Collection
}

var _ PetsService = (*petsService)(nil)

func NewPetsService(collection *mongo.Collection) PetsService {
	return &petsService{animalCollection: collection}
}

func (service petsService) Count(ctx context.Context) (int64, error) {
	count, err := service.animalCollection.CountDocuments(ctx, bson.D{})
	if err != nil {
		fmt.Println(err)
		return 0, err
	}

	return count, nil
}

func (service petsService) GetAll(ctx context.Context, page int64, rango int64) ([]models.AnimalView, error) {

	var endItem int64 = page * rango
	var startItem int64 = 0
	if page > 0 {
		startItem = (page - 1) * rango
	}

	projection := bson.D{
		primitive.E{Key: "nombre", Value: 1},
		primitive.E{Key: "color", Value: 1},
		primitive.E{Key: "tamaño", Value: 1},
		primitive.E{Key: "esterilizado", Value: 1},
		primitive.E{Key: "descripcion", Value: 1},
		primitive.E{Key: "fecha_nacimiento", Value: 1},
		primitive.E{Key: "especie", Value: 1},
		primitive.E{Key: "raza", Value: 1},
		primitive.E{Key: "fotos", Value: bson.D{primitive.E{Key: "$slice", Value: 1}}},
		primitive.E{Key: "sexo", Value: 1},
	}

	findOptions := options.Find().SetProjection(projection).SetSkip(startItem).SetLimit(endItem).SetSort(bson.D{primitive.E{Key: "score", Value: -1}})
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

func (service petsService) GetAllFilter(ctx context.Context, filter *models.AnimaFilterPublic, page int64, rango int64) ([]models.AnimalView, error) {

	var endItem int64 = page * rango
	var startItem int64 = 0
	if page > 0 {
		startItem = (page - 1) * rango
	}

	projection := bson.D{
		primitive.E{Key: "nombre", Value: 1},
		primitive.E{Key: "color", Value: 1},
		primitive.E{Key: "tamaño", Value: 1},
		primitive.E{Key: "esterilizado", Value: 1},
		primitive.E{Key: "descripcion", Value: 1},
		primitive.E{Key: "fecha_nacimiento", Value: 1},
		primitive.E{Key: "especie", Value: 1},
		primitive.E{Key: "raza", Value: 1},
		primitive.E{Key: "fotos", Value: bson.D{primitive.E{Key: "$slice", Value: 1}}},
		primitive.E{Key: "sexo", Value: 1},
	}

	filterMongo := bson.D{primitive.E{Key: "sexo", Value: filter.Sexo}, primitive.E{Key: "especie", Value: filter.Especie}, primitive.E{Key: "tamaño", Value: filter.Tamaño}}
	findOptions := options.Find().SetProjection(projection).SetSkip(startItem).SetLimit(endItem).SetSort(bson.D{primitive.E{Key: "score", Value: -1}})
	cursor, err := service.animalCollection.Find(ctx, filterMongo, findOptions)
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
	newAnimal.Fotos = []models.Foto{}
	newAnimal.Score = 0
	newAnimal.Estado = true

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

func (service petsService) AddPhoto(ctx context.Context, id string, photo models.Foto) error {

	filter, err := matchID(id)
	if err != nil {
		return err
	}
	elem := bson.D{}

	if photo.Id != "" {
		elem = append(elem, bson.E{Key: "fotos", Value: photo})
	}

	updatePetPhotos := bson.D{
		{Key: "$push", Value: elem},
	}

	_, err = service.animalCollection.UpdateOne(ctx, filter, updatePetPhotos)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return util.ErrNotFound
		}
		return err
	}

	return nil
}

func (service petsService) AddPeso(ctx context.Context, id string, newPeso *models.ControlPeso) error {

	filter, err := matchID(id)
	if err != nil {
		return err
	}
	elem := bson.D{}

	newPeso.Id = strings.Replace(uuid.New().String(), "-", "", -1)
	newPeso.CreatedAt = time.Now()

	if newPeso.Id != "" {
		elem = append(elem, bson.E{Key: "control_peso", Value: newPeso})
	}

	updatePetPeso := bson.D{
		{Key: "$push", Value: elem},
	}

	_, err = service.animalCollection.UpdateOne(ctx, filter, updatePetPeso)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return util.ErrNotFound
		}
		return err
	}

	return nil
}

func (service petsService) GetPhotosByIDPrivate(ctx context.Context, id string) ([]models.Foto, error) {

	result := struct {
		Fotos []models.Foto `json:"fotos"`
	}{}
	projection := bson.D{
		primitive.E{Key: "fotos", Value: 1},
	}

	filter, err := matchID(id)
	findOptions := options.FindOne().SetProjection(projection)
	singleResult := service.animalCollection.FindOne(ctx, filter, findOptions)

	if singleResult.Err() != nil {
		log.Println("Find error: ", singleResult.Err())
		return result.Fotos, err
	}

	err = singleResult.Decode(&result)

	return result.Fotos, err
}

func (service petsService) GetClue(adopt *models.AdoptanteClue) (models.AnimalDetail, error) {
	var petValue models.AnimalDetail

	filterObject := GetClueIA(adopt)

	fmt.Println(filterObject)

	filter := bson.D{
		//{Key: "color", Value: filterObject.Color},
		//{Key: "raza", Value: filterObject.Raza},
		{Key: "tamaño", Value: filterObject.Tamaño},
		{Key: "especie", Value: filterObject.Especie},
		{Key: "estado", Value: true},
		{Key: "en_adopcion", Value: true},
	}

	err := service.animalCollection.FindOne(nil, filter).Decode(&petValue)
	if err == mongo.ErrNoDocuments {
		return petValue, err
	}
	return petValue, err
}
