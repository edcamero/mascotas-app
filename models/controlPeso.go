package models

import "time"

type ControlPeso struct {
	Id        string    `json:"id" bson:"id"`
	Peso      int64     `json:"peso" bson:"peso"`
	CreatedAt time.Time `json:"createdAt" bson:"createdAt"`
}

type ControlPesoAnimal struct {
	ControlPeso []ControlPeso `json:"controlPeso" bson:"control_peso"`
}
