package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Animal struct {
	ID primitive.ObjectID `bson:"_id"`
	//Persona Persona            `json:"nombre" bson:"rolnombre"`
	Nombre           string          `json:"nombre" bson:"nombre"`
	Color            string          `json:"color" bson:"color"`
	Tamaño           string          `json:"tamaño" bson:"tamaño"`
	Esterilizado     bool            `json:"esterilizado" bson:"esterilizado"`
	En_adopcion      bool            `json:"en_adopcion" bson:"en_adopcion"`
	Descripcion      string          `json:"descripcion" bson:"descripcion"`
	Fecha_nacimiento time.Time       `json:"fecha_nacimiento" bson:"fecha_nacimiento"`
	Especie          string          `json:"especie" bson:"especie"`
	Fotos            []Foto          `json:"fotos" bson:"fotos"`
	Vacunas          []VacunaMascota `json:"vacunas" bson:"vacunas"`
}

type AnimalView struct {
	ID primitive.ObjectID `bson:"_id"`
	//Persona Persona            `json:"nombre" bson:"rolnombre"`
	Nombre           string    `json:"nombre" bson:"nombre"`
	Color            string    `json:"color" bson:"color"`
	Tamaño           string    `json:"tamaño" bson:"tamaño"`
	Esterilizado     bool      `json:"esterilizado" bson:"esterilizado"`
	Descripcion      string    `json:"descripcion" bson:"descripcion"`
	Fecha_nacimiento time.Time `json:"fecha_nacimiento" bson:"fecha_nacimiento"`
	Especie          string    `json:"especie" bson:"especie"`
	Foto             []Foto    `json:"fotos" bson:"fotos"`
}

type AnimalDetail struct {
	ID primitive.ObjectID `bson:"_id"`
	//Persona Persona            `json:"nombre" bson:"rolnombre"`
	Nombre           string    `json:"nombre" bson:"nombre"`
	Color            string    `json:"color" bson:"color"`
	Tamaño           string    `json:"tamaño" bson:"Tamaño"`
	Esterilizado     bool      `json:"esterilizado" bson:"esterilizado"`
	Descripcion      string    `json:"descripcion" bson:"descripcion"`
	Fecha_nacimiento time.Time `json:"fecha_nacimiento" bson:"fecha_nacimiento"`
	Especie          string    `json:"especie" bson:"especie"`
	Fotos            []Foto    `json:"fotos" bson:"fotos"`
}
