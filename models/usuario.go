package models

import (
	"time"

	"github.com/kataras/iris/v12/middleware/jwt"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Usuario struct {
	ID         primitive.ObjectID `bson:"_id"`
	UserName   string             `json:"username" bson:"username"`
	Password   string             `bson:"password"`
	Email      string             `json:"email" bson:"email"`
	Rol        Rol                `json:"rol" bson:"rol"`
	InsertedAt time.Time          `json:"inserted_at" bson:"inserted_at"`
	LastUpdate time.Time          `json:"last_update" bson:"last_update"`
	//DeleteAt time.Time 		`json:"delete_at" bson:"delete_at"`
	//Edad        uint   `bson:"edad"`
	//Telefono    string `bson:"telefono"`
	//Direccion   string `bson:"direccion"`
	//Email       string `bson:"email"`
	//Descripcion string `bson:"descripcion"`
}

type UsuarioView struct {
	ID       primitive.ObjectID `json:"id" bson:"_id"`
	UserName string             `json:"username" bson:"username"`
	Rol      Rol                `json:"rol" bson:"rol"`
}

type UsuarioLoginResponse struct {
	User  UsuarioView   `json:"user"`
	Token jwt.TokenPair `json:"token"`
}
