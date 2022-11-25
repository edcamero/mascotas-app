package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Animal struct {
	ID               primitive.ObjectID `bson:"_id"`
	Nombre           string             `json:"nombre" bson:"nombre"`
	Color            string             `json:"color" bson:"color"`
	Tamaño           string             `json:"tamaño" bson:"tamaño"`
	Esterilizado     bool               `json:"esterilizado" bson:"esterilizado"`
	En_adopcion      bool               `json:"en_adopcion" bson:"en_adopcion"`
	Descripcion      string             `json:"descripcion" bson:"descripcion"`
	Fecha_nacimiento time.Time          `json:"fechaNacimiento" bson:"fecha_nacimiento"`
	Especie          string             `json:"especie" bson:"especie"`
	Raza             string             `json:"raza" bson:"raza"`
	Fotos            []Foto             `json:"fotos" bson:"fotos"`
	Sexo             string             `json:"sexo" bson:"sexo"`
	Vacunas          []VacunaMascota    `json:"vacunas" bson:"vacunas"`
	Score            int                `json:"score" bson:"score"`
	CreatedAt        time.Time          `json:"createdAt" bson:"createdAt"`
	UpdatedAt        time.Time          `json:"updatedAt" bson:"updatedAt" `
}

type AnimalView struct {
	ID primitive.ObjectID `bson:"_id"`
	//Persona Persona            `json:"nombre" bson:"rolnombre"`
	Nombre           string    `json:"nombre" bson:"nombre"`
	Color            string    `json:"color" bson:"color"`
	Tamaño           string    `json:"tamaño" bson:"tamaño"`
	Esterilizado     bool      `json:"esterilizado" bson:"esterilizado"`
	Descripcion      string    `json:"descripcion" bson:"descripcion"`
	Fecha_nacimiento time.Time `json:"fechaNacimiento" bson:"fecha_nacimiento"`
	Especie          string    `json:"especie" bson:"especie"`
	Raza             string    `json:"raza" bson:"raza"`
	Sexo             string    `json:"sexo" bson:"sexo"`
	Foto             []Foto    `json:"fotos" bson:"fotos"`
	CreatedAt        time.Time `json:"createdAt" bson:"createdAt"`
	UpdatedAt        time.Time `json:"updatedAt" bson:"updatedAt" `
}

type AnimalDetail struct {
	ID primitive.ObjectID `bson:"_id"`
	//Persona Persona            `json:"nombre" bson:"rolnombre"`
	Nombre           string    `json:"nombre" bson:"nombre"`
	Color            string    `json:"color" bson:"color"`
	Tamaño           string    `json:"tamaño" bson:"tamaño"`
	Esterilizado     bool      `json:"esterilizado" bson:"esterilizado"`
	Descripcion      string    `json:"descripcion" bson:"descripcion"`
	Fecha_nacimiento time.Time `json:"fechaNacimiento" bson:"fecha_nacimiento"`
	Especie          string    `json:"especie" bson:"especie"`
	Raza             string    `json:"raza" bson:"raza"`
	Sexo             string    `json:"sexo" bson:"sexo"`
	Fotos            []Foto    `json:"fotos" bson:"fotos"`
	CreatedAt        time.Time `json:"createdAt" bson:"createdAt"`
	UpdatedAt        time.Time `json:"updatedAt" bson:"updatedAt" `
}

type AnimalAdopt struct {
	ID              primitive.ObjectID `bson:"_id"`
	Nombre          string             `json:"nombre" bson:"nombre"`
	Color           string             `json:"color" bson:"color"`
	Tamaño          string             `json:"tamaño" bson:"tamaño"`
	Esterilizado    bool               `json:"esterilizado" bson:"esterilizado"`
	FechaNacimiento time.Time          `json:"fechaNacimiento" bson:"fecha_nacimiento"`
	EnAdopcion      bool               `json:"enAdopcion" bson:"en_adopcion"`
	Especie         string             `json:"especie" bson:"especie"`
	Raza            string             `json:"raza" bson:"raza"`
	Sexo            string             `json:"sexo" bson:"sexo"`
}
