package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Adopcion struct {
	ID        primitive.ObjectID `bson:"_id"`
	Adoptante []Adoptante        `json:"adoptante" bson:"adoptante"`
}

type AdopcionList struct {
	ID  primitive.ObjectID `json:"id" bson:"_id"`
	Pet AnimalAdopt        `json:"pet" bson:"pet"`
}

type AdopcionView struct {
	ID         primitive.ObjectID `json:"id" bson:"_id"`
	Adoptantes []Adoptante        `json:"adopters" bson:"adoptante"`
	Pet        AnimalAdopt        `json:"pet" bson:"pet"`
}
