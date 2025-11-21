package reviews

import (
	"encoding/json"
	"fmt"
	"go-server/helpers"
	"go-server/services/db"
	"net/http"
)

func Get(w http.ResponseWriter, r *http.Request) (interface{}, error) {
	var reviewsArray []db.Review

	result := db.DB.Find(&reviewsArray)

	if result.Error != nil {
		return nil, fmt.Errorf("DB ERROR")
	}

	jsonMap := map[string]interface{} {
		"reviews": reviewsArray,
	}

	data, _ := json.Marshal(jsonMap)

	w.Write(data)
	return nil, nil
}

func ReviewsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		Get(w, r)
		return
	}

	helpers.SendMethodError(w, r)
}