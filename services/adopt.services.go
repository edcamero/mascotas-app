package services

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/edcamero/api-go/models"
	"github.com/edcamero/api-go/util"
	"github.com/go-gota/gota/dataframe"
	"github.com/go-gota/gota/series"
	"github.com/sjwhitworth/golearn/base"
	"github.com/sjwhitworth/golearn/knn"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type AdoptService interface {
	Count(ctx context.Context, id string) (int64, error)
	Save(ctx context.Context, id string, newAdopt *models.Adoptante) (bool, error)
	GetAllPrivate(ctx context.Context) ([]models.AdopcionList, error)
	GetByIDPrivate(ctx context.Context, id string) (models.AdopcionView, error)
}

type adoptService struct {
	adoptionsCollection *mongo.Collection
}

var _ AdoptService = (*adoptService)(nil)

func NewAdoptService(collection *mongo.Collection) AdoptService {
	return &adoptService{adoptionsCollection: collection}
}

func (service adoptService) Count(ctx context.Context, id string) (int64, error) {
	count, err := service.adoptionsCollection.CountDocuments(ctx, bson.D{})
	if err != nil {
		fmt.Println(err)
		return 0, err
	}

	return count, nil
}

func (service adoptService) Save(ctx context.Context, id string, newAdopt *models.Adoptante) (bool, error) {
	filter, err := matchID(id)

	elem := bson.D{}

	newAdopt.Estado = "inicial"
	if newAdopt.Documento.Numero != "" {
		elem = append(elem, bson.E{Key: "adoptante", Value: newAdopt})
	}

	timeUpdate := time.Now()
	newAdopt.CreatedAt = timeUpdate
	newAdopt.UpdatedAt = timeUpdate

	updateAdopt := bson.D{
		{Key: "$push", Value: elem},
	}

	opts := options.Update().SetUpsert(true)

	_, err = service.adoptionsCollection.UpdateOne(ctx, filter, updateAdopt, opts)
	if err != nil {
		return false, err
	}
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return false, util.ErrNotFound
		}
		return false, err
	}

	return true, nil
}

func (service adoptService) GetAllPrivate(ctx context.Context) ([]models.AdopcionList, error) {

	projection := bson.D{{Key: "$project",
		Value: bson.D{
			{Key: "pet.nombre", Value: 1},
			{Key: "pet.color", Value: 1},
			{Key: "pet.tamaño", Value: 1},
			{Key: "pet.esterilizado", Value: 1},
			{Key: "pet.fecha_nacimiento", Value: 1},
			{Key: "pet.en_adopcion", Value: 1},
			{Key: "pet.especie", Value: 1},
			{Key: "pet.raza", Value: 1},
			{Key: "pet.sexo", Value: 1},
			{Key: "pet._id", Value: 1},
			{Key: "_id", Value: 1},
		}}}
	lookupStage := bson.D{{
		Key: "$lookup",
		Value: bson.D{
			{Key: "from", Value: "animal"},
			{Key: "localField", Value: "_id"},
			{Key: "foreignField", Value: "_id"},
			{Key: "as", Value: "pets"},
		},
	}}

	firtsPet := bson.D{{
		Key: "$addFields",
		Value: bson.D{
			{Key: "pet", Value: bson.D{
				{Key: "$first", Value: "$pets"},
			}},
		},
	}}

	//findOptions := options.Find().SetProjection(projection).SetSort(bson.D{primitive.E{Key: "score", Value: -1}})
	//cursor, err := service.adoptionsCollection.Find(ctx, bson.D{}, findOptions)
	cursor, err := service.adoptionsCollection.Aggregate(ctx, mongo.Pipeline{lookupStage, firtsPet, projection})

	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	defer cursor.Close(ctx)

	var results []models.AdopcionList

	for cursor.Next(ctx) {
		if err = cursor.Err(); err != nil {
			fmt.Println("este error cursor")
			return nil, err
		}
		var elem models.AdopcionList
		err = cursor.Decode(&elem)
		if err != nil {
			fmt.Println(err)
			fmt.Println(cursor)
			return nil, err
		}
		results = append(results, elem)
	}

	return results, nil
}

func (service adoptService) GetByIDPrivate(ctx context.Context, id string) (models.AdopcionView, error) {
	projection := bson.D{{Key: "$project",
		Value: bson.D{
			{Key: "pet.nombre", Value: 1},
			{Key: "pet.color", Value: 1},
			{Key: "pet.tamaño", Value: 1},
			{Key: "pet.esterilizado", Value: 1},
			{Key: "pet.fecha_nacimiento", Value: 1},
			{Key: "pet.en_adopcion", Value: 1},
			{Key: "pet.especie", Value: 1},
			{Key: "pet.raza", Value: 1},
			{Key: "pet.sexo", Value: 1},
			{Key: "pet._id", Value: 1},
			{Key: "_id", Value: 1},
			{Key: "adoptante", Value: 1},
		}}}
	lookupStage := bson.D{{
		Key: "$lookup",
		Value: bson.D{
			{Key: "from", Value: "animal"},
			{Key: "localField", Value: "_id"},
			{Key: "foreignField", Value: "_id"},
			{Key: "as", Value: "pets"},
		},
	}}

	firtsPet := bson.D{{
		Key: "$addFields",
		Value: bson.D{
			{Key: "pet", Value: bson.D{
				{Key: "$first", Value: "$pets"},
			}},
		},
	}}

	objectID, err := primitive.ObjectIDFromHex(id)
	matchPet := bson.D{{
		Key: "$match",
		Value: bson.D{
			{Key: "_id", Value: bson.D{
				{Key: "$eq", Value: objectID},
			}},
		},
	}}

	var results []models.AdopcionView
	var resultsFail models.AdopcionView

	if err != nil {
		fmt.Println(err)
		return resultsFail, err
	}

	cursor, err := service.adoptionsCollection.Aggregate(ctx, mongo.Pipeline{matchPet, lookupStage, firtsPet, projection})

	if err != nil {
		fmt.Println(err)
		return resultsFail, err
	}
	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		if err = cursor.Err(); err != nil {
			fmt.Println("este error cursor")
			return resultsFail, err
		}
		var elem models.AdopcionView
		err = cursor.Decode(&elem)
		if err != nil {
			fmt.Println(err)
			fmt.Println(cursor)
			return resultsFail, err
		}
		results = append(results, elem)
	}
	if len(results) == 0 {
		return resultsFail, ctx.Err()
	}

	return results[0], err
}

func GetClueIA(adopt *models.AdoptanteClue) models.AnimalResponseIA {

	directory := "./data-mascotas2.csv"
	filePathResponse := "./respuesta.csv"

	if err := os.Truncate(filePathResponse, 0); err != nil {
		log.Printf("Failed to truncate: %v", err)
	}
	rawData, err := base.ParseCSVToInstances(directory, true)
	if err != nil {
		panic(err)
	}

	//Initialises a new KNN classifier
	cls := knn.NewKnnClassifier("euclidean", "linear", 2)

	//Do a training-test split
	trainData, testData := base.InstancesTrainTestSplit(rawData, 0.50)
	cls.Fit(trainData)

	base.SerializeInstancesToCSV(testData, filePathResponse)
	
	result, err := os.Open(filePathResponse)
	df := dataframe.ReadCSV(result)
	df = df.Filter(
		dataframe.F{Colname: "tamaño-vivienda", Comparator: series.Eq, Comparando: adopt.Vivienda},
		dataframe.F{Colname: "sexo-adoptante", Comparator: series.Eq, Comparando: adopt.Sexo},
		dataframe.F{Colname: "estado-civil", Comparator: series.Eq, Comparando: adopt.EstadoCivil},
		dataframe.F{Colname: "edad-adoptante", Comparator: series.Greater, Comparando: adopt.Edad + 5},
		dataframe.F{Colname: "edad-adoptante", Comparator: series.LessEq, Comparando: adopt.Edad - 5},
		dataframe.F{Colname: "estrato", Comparator: series.LessEq, Comparando: adopt.Estrato},
	)
	fmt.Println(testData)

	var results models.AnimalResponseIA

	results.Color = df.Col("color").Elem(0).String()
	results.Tamaño = df.Col("tamaño").Elem(0).String()
	results.Especie = df.Col("especie").Elem(0).String()
	results.Raza = df.Col("raza").Elem(0).String()

	return results
}
