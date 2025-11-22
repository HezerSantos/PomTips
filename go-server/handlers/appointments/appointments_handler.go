package appointments

import (
	"go-server/helpers"
	"net/http"
)

func AppointmentHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		GetAppointments(w, r)
		return
	case "POST":
		PostAppointments(w, r)
		return
	}
	helpers.SendMethodError(w, r)
}