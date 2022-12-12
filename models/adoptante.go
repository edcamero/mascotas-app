package models

import "time"

type Adoptante struct {
	Documento Documento `json:"documento" bson:"documento"`
	Nombres   string    `json:"nombres" bson:"nombres"`
	Apellidos string    `json:"apellidos" bson:"apellidos"`
	Direccion Direccion `json:"direccion" bson:"direccion"`
	Telefono  string    `json:"telefono" bson:"telefono"`
	Email     string    `json:"email" bson:"email"`
	Estado    string    `json:"estado" bson:"estado"`
	CreatedAt time.Time `json:"createdAt" bson:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt" bson:"updatedAt" `
}

type AdoptanteClue struct {
	Vivienda    string `json:"vivienda" bson:"vivienda"`
	Sexo        string `json:"sexo" bson:"sexo"`
	EstadoCivil string `json:"estadoCivil" bson:"estadoCivil"`
	Edad        int16  `json:"edad" bson:"edad"`
	Estrato     int16  `json:"estrato" bson:"estrato"`
}
