package db

import (
    "github.com/google/uuid"
)

type Review struct {
    ID        uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey" json:"id"`
    FirstName string `json:"firstName"`
    LastName  string `json:"lastName"`
    Rating    int    `json:"rating"`
    Review    string  `json:"review"`
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
    Service string 
	AddOn string
	Upgrade string

    Image Images `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
}


type Images struct {
    ID uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
    AppointmentID uuid.UUID `gorm:"type:uuid;uniqueIndex"`
    FileName string
}