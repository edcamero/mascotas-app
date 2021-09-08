package models

type Foto struct {
	Id  int32  `json:"id" bson:"id"`
	Url string `json:"url" bson:"url"`
}
