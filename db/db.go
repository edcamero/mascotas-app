package db

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// GetConnection obtiene una conexión a la base de datos
func GetConnection() *mongo.Client {

	clientOpts := options.Client().ApplyURI(os.Getenv("DATABASE_URL"))

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	Client, err := mongo.Connect(ctx, clientOpts)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Conecto a la db")

	return Client
}

func GetDatabase() *mongo.Database {
	conexion := GetConnection()
	Database := conexion.Database(os.Getenv("DATABASE"))
	return Database
}
