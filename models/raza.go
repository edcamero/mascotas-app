package models

type Raza struct {
	Id     int32  `json:"id" bson:"id"`
	Nombre string `json:"nombre" bson:"nombre"`
}
