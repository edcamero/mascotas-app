package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Vacuna struct {
	ID       primitive.ObjectID `bson:"_id"`
	Nombre   string             `json:"nombre" bson:"nombre"`
	Refuerzo int32              `json:"refuerzo" bson:"refuerzo"`
}
