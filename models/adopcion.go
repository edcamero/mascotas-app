package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Adopcion struct {
	ID        primitive.ObjectID `bson:"_id"`
	Adoptante []Adoptante        `json:"adoptante" bson:"adoptante"`
}
