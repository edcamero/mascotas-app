package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Especie struct {
	ID     primitive.ObjectID `bson:"_id"`
	Nombre string             `json:"nombre"  bson:"nombre"`
	Razas  []Raza             `json:"razas"  bson:"razas"`
}
