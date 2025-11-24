package db

import (
	"fmt"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)


var DB *gorm.DB

func Connect() {
    fmt.Println("   CONNECTING TO DATABASE...")
    dsn := os.Getenv("DATABASE_URL")
    if dsn == "" {
        panic("missing DATABASE_URL")
    }

    database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        panic(err)
    }

    DB = database
    fmt.Println("   FINISHED CONNECTING TO DATABASE...")
}

func Migrate() {
    fmt.Println("   MIGRATING DATABASE...")
	DB.AutoMigrate(&Review{}, &NailInfo{}, &Appointment{}, &Images{})
    fmt.Println("   FINISHED MIGRATING DATABASE...")
}