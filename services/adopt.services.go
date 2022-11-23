package services

import (
	"context"
	"fmt"
	"time"

	"github.com/edcamero/api-go/models"
	"github.com/edcamero/api-go/util"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type AdoptService interface {
	Count(ctx context.Context, id string) (int64, error)
	Save(ctx context.Context, id string, newAdopt *models.Adoptante) (bool, error)
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
