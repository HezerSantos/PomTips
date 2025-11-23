package appointments

import (
	"bytes"
	"fmt"
	"go-server/helpers"
	"go-server/services/cloudflare"
	"io"
	"net/http"
	"strings"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/h2non/filetype"
)

type AppointmentData struct{
	Date string `json:"date" validate:"required,validateDate"`
	Name string	`json:"name" validate:"required,min=1"`
	Email string `json:"email" validate:"required,email"`
	Time string `json:"time" validate:"required,validateTime"`
	Service string `json:"service" validate:"required,validateService"`
	AddOn string `json:"addon" validate:"required,validateAddOn"`
	Upgrade string `json:"upgrade" validate:"required,validateUpgrade"`
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

func validateService(fl validator.FieldLevel) bool {
	servicesSet := map[string]struct{} {
		"Acrylic Full Set": {},
        "Acrylic Fill": {},
        "Gel-X Full Set": {},
        "Hard Gel Full Set": {},
        "Dip Powder Full Set": {},
        "Classic Manicure": {},
        "Gel Manicure": {},
        "Builder Gel (BIAB) Manicure": {},
        "Regular Pedicure": {},
        "Gel Pedicure": {},
	}

	_, ok := servicesSet[fl.Field().String()]

	return ok
}

func validateAddOn(fl validator.FieldLevel) bool {
	addOnsSet := map[string]struct{}{
		"French Tips":         {},
		"Simple Nail Art":     {},
		"Advanced Nail Art":   {},
		"Chrome":              {},
		"Cat Eye":             {},
		"Encapsulated Art":    {},
		"Extra Long Length":   {},
		"Shape Change":        {},
		"Soak-Off Removal":    {},
		"Nail Repair":         {},
	}
	_, ok := addOnsSet[fl.Field().String()]

	return ok
}

func validateUpgrade(fl validator.FieldLevel) bool {
	upgradesSet := map[string]struct{}{
		"Gel Polish Upgrade":  {},
		"Paraffin Treatment":  {},
		"Deluxe Scrub":        {},
		"Callus Removal":      {},
	}
	_, ok := upgradesSet[fl.Field().String()]

	return ok
}

var validate = validator.New()

func PostAppointments(w http.ResponseWriter, r *http.Request) {
	validate.RegisterValidation("validateDate", validateDate)
	validate.RegisterValidation("validateTime", validateTime)
	validate.RegisterValidation("validateService", validateService)
	validate.RegisterValidation("validateAddOn", validateAddOn)
	validate.RegisterValidation("validateUpgrade", validateUpgrade)

	r.Body = http.MaxBytesReader(w, r.Body, 10<<20)
	fileErr := r.ParseMultipartForm(10 << 20)
	data := AppointmentData{
		Date: r.FormValue("date"),
		Name: r.FormValue("name"), 
		Email: r.FormValue("email"), 
		Time: r.FormValue("time"), 
		Service: r.FormValue("service"), 
		AddOn: r.FormValue("addon"), 
		Upgrade: r.FormValue("upgrade"), 
	}




	if err := validate.Struct(data); err != nil {
		validationErrors := []helpers.ValidationError{}
		for _, err := range err.(validator.ValidationErrors) {
			validationError := helpers.ValidationError{Path: strings.ToLower(err.Field()), Msg: fmt.Sprintf("Invalid %s", err.Field())}
			validationErrors = append(validationErrors, validationError)
		}
		if fileErr != nil {
			validationError := helpers.ValidationError{Path: "refImage", Msg: "Invalid Upload"}
			validationErrors = append(validationErrors, validationError)
		}
		helpers.SendError(w, r, 400, helpers.JsonError{Msg: "Invalid Body", Code: "INVALID_BODY", ValidationErrors: &validationErrors})
		return
	}

	file, headers, err := r.FormFile("refImage")


	if err != nil {
		validationErrors := []helpers.ValidationError{}
		validationError := helpers.ValidationError{Path: "refImage", Msg: "Invalid Upload"}
		validationErrors = append(validationErrors, validationError)
		helpers.SendError(w, r, 400, helpers.JsonError{Msg: "Invalid Upload", Code: "INVALID_BODY", ValidationErrors: &validationErrors})
		return
	}
	defer file.Close()
	
	buf := bytes.NewBuffer(nil)
	if _, err := io.Copy(buf, file); err != nil { 
		fmt.Println("	Reading Error")
		helpers.SendNetworkError(w, r)
		return
	}
	fmt.Printf("Size Original: %d", buf.Len())
	kind, ok := getMimeType(buf)
	if !ok {
		helpers.SendNetworkError(w, r)
		return
	}

	ok = cloudflare.StoreImage("pomtips", fmt.Sprintf("NailInfo/%s", headers.Filename), buf, kind, w, r)

	if !ok {
		return
	}
	w.Write([]byte("Photo Sent"))
}


func getMimeType(buf *bytes.Buffer) (string, bool){
	fixedBuf := buf.Bytes()[:261]

	kind, err := filetype.Match(fixedBuf)

	if err != nil {
		return "", false
	}

	return kind.MIME.Value, true
}