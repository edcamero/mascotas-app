package db

import (
	"fmt"

	"github.com/edcamero/api-go/models"
)

func MigrateDB() {

	db := GetConnection()
	defer db.Close()
	fmt.Println("Migrating models....")
	// Automigrate se encarga de migrar la base de datos sí no se ha migrado, y lo hace a partir del modelo
	db.AutoMigrate(&models.User{})

}
