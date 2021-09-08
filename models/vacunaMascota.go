package models

import "time"

type VacunaMascota struct {
	Nombre string    `json:"nombre" bson:"nombre"`
	Fecha  time.Time `json:"fecha" bson:"fecha"`
}
