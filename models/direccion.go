package models

type Direccion struct {
	Ciudad    string `json:"ciudad"  bson:"ciudad"`
	Barrio    string `json:"barrio" bson:"barrio"`
	Direccion string `json:"direccion" bson:"direccion"`
}
