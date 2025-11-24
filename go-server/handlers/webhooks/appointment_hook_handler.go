package webhooks

import (
	"encoding/json"
	"go-server/helpers"
	"go-server/services/cloudflare"
	"go-server/services/db"
	"net/http"

	"github.com/stripe/stripe-go/v84"
)

type AppointmentJson struct {
	Date string `json:"date"`
	Name string	`json:"name"`
	Email string `json:"email"`
	Time string `json:"time"`
	Service string `json:"service"`
	AddOn string `json:"addon"`
	Upgrade string `json:"upgrade"`

	FileName string `json:"fileName"`
}




func createAppointmentHook(w http.ResponseWriter, r *http.Request, session stripe.CheckoutSession) {
	if session.Metadata != nil {
		data, _ := json.Marshal(session.Metadata)

		var appointmentData AppointmentJson

		_ = json.Unmarshal(data, &appointmentData)

		result := db.DB.Create(&db.Appointment{
			Date: appointmentData.Date,
			Name: appointmentData.Name,
			Email: appointmentData.Email,
			Time: appointmentData.Time,
			Service: appointmentData.Service,
			AddOn: appointmentData.AddOn,
			Upgrade: appointmentData.Upgrade,
			Image: db.Images{
				FileName: appointmentData.FileName,
			},
		})

		if result.Error != nil {
			helpers.SendNetworkError(w, r, "APPOINTMENT WEBHOOK ERROR", result.Error)
			return
		}
	}
}

func deleteAppointmentHook(w http.ResponseWriter, r *http.Request, session stripe.CheckoutSession) {
	if !cloudflare.DeleteImage("pomtips", "NailInfo", session.Metadata["fileName"], w, r) {
		return
	}
} 