package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Especie struct {
	ID        primitive.ObjectID `bson:"_id"`
	Nombre    string             `json:"nombre"  bson:"nombre"`
	Razas     []Raza             `json:"razas"  bson:"razas"`
	CreatedAt time.Time          `json:"createdAt" bson:"createdAt"`
	UpdatedAt time.Time          `json:"updatedAt" bson:"updatedAt" `
}
type NewEspecie struct {
	ID        primitive.ObjectID `bson:"_id"`
	Nombre    string             `json:"nombre"  bson:"nombre"`
	Razas     []Raza             `json:"razas"  bson:"razas"`
	CreatedAt time.Time          `json:"createdAt" bson:"createdAt"`
	UpdatedAt time.Time          `json:"updatedAt" bson:"updatedAt" `
}
