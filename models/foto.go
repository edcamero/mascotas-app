package models

type Foto struct {
	Id  string `json:"id" bson:"id"`
	Url string `json:"url" bson:"url"`
}
