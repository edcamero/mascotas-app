package models

import "time"

type ControlVacuna struct {
	Id            string    `json:"id" bson:"id"`
	Nombre        string    `json:"nombre" bson:"nombre"`
	Peso          int64     `json:"peso" bson:"peso"`
	CreatedAt     time.Time `json:"createdAt" bson:"createdAt"`
	NextControlAt time.Time `json:"nextControlAt" bson:"next_control_at"`
}

type ControlVacunaAnimal struct {
	ControlVacuna []ControlVacuna `json:"controlVacuna" bson:"control_vacuna"`
}
