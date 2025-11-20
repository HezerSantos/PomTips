package db

import (
    "github.com/google/uuid"
)

type Review struct {
    ID        uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
    FirstName string
    LastName  string
    Rating    int
    Review    string
}

type NailInfo struct {
    ID            uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey" json:"id"`
    Name          string     `json:"name"`
    StartingPrice int        `json:"startingPrice"`
    ImageUrl      string     `json:"imageUrl"`
}

type Appointment struct {
    ID    uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
    Name  string
    Email string
    Date  string
    Time  string
}
