package appointments

import (
	"encoding/json"
	"fmt"
	"go-server/helpers"
	"net/http"
	"time"
	"strings"
	"github.com/go-playground/validator/v10"
)

type AppointmentJson struct{
	Date string `json:"date" validate:"required,validateDate"`
	Name string	`json:"name" validate:"required,min=1"`
	Email string `json:"email" validate:"required,email"`
	Time string `json:"time" validate:"required,validateTime"`
}

type BookDataWrapper struct {
    BookData AppointmentJson `json:"bookData"`
}

func validateDate(fl validator.FieldLevel) bool {
	_, err := time.Parse("2006-01-02", fl.Field().String())
    return err == nil
}

func validateTime(fl validator.FieldLevel) bool {
	set := map[string]struct{}{
		"10:00 AM": {},
		"12:00 PM": {},
		"2:00 PM": {},
		"4:00 PM": {},
	}

	_, ok := set[fl.Field().String()]

	return ok
}

var validate = validator.New()

func PostAppointments(w http.ResponseWriter, r *http.Request) {
	validate.RegisterValidation("validateDate", validateDate)
	validate.RegisterValidation("validateTime", validateTime)
	var data BookDataWrapper
	err := json.NewDecoder(r.Body).Decode(&data)

	if err != nil {
		helpers.SendNetworkError(w, r)
		return
	}

	if err := validate.Struct(data); err != nil {
		validationErrors := []helpers.ValidationError{}
		for _, err := range err.(validator.ValidationErrors) {
			validationError := helpers.ValidationError{Path: strings.ToLower(err.Field()), Msg: fmt.Sprintf("Invalid %s", err.Field())}
			validationErrors = append(validationErrors, validationError)
		}
		helpers.SendError(w, r, 400, helpers.JsonError{Msg: "Invalid Body", Code: "INVALID_BODY", ValidationErrors: &validationErrors})
		return
	}
	w.Write([]byte("Hello"))
}