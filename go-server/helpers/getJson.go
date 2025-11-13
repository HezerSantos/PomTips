package helpers

import (
	"net/http"
	"encoding/json"
)

func GetJson(w http.ResponseWriter, r *http.Request) (map[string]interface{}, error) {
	payload := map[string]interface{}{}
	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil{
		return nil, err
	}
	return payload, nil
}