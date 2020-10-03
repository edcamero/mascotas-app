package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID        primitive.ObjectID `bson:"_id"`
	UserName	string `bson:"username"`
	Password	string  `bson:"password"`
	//Edad        uint   `bson:"edad"`
	//Telefono    string `bson:"telefono"`
	//Direccion   string `bson:"direccion"`
	//Email       string `bson:"email"`
	//Descripcion string `bson:"descripcion"`
}
