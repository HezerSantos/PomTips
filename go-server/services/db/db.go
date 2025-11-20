package db

import (
	"os"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)


var DB *gorm.DB

func Connect() {
    dsn := os.Getenv("DATABASE_URL")
    if dsn == "" {
        panic("missing DATABASE_URL")
    }

    database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        panic(err)
    }

    DB = database
}

func Migrate() {
	DB.AutoMigrate(&Review{}, &NailInfo{}, &Appointment{})
}