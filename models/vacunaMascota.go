package models

import "time"

type VacunaMascota struct {
	Nombre        string    `json:"nombre" bson:"nombre"`
	Fecha         time.Time `json:"fecha" bson:"fecha"`
	Peso          float32   `json:"peso" bson:"peso"`
	NextControlAt time.Time `json:"nextControlAt" bson:"nextControlAt"`
	CreatedAt     time.Time `json:"createdAt" bson:"createdAt"`
	UpdatedAt     time.Time `json:"updatedAt" bson:"updatedAt" `
}
