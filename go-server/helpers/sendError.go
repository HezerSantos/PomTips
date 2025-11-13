package helpers

import (
	"net/http"
	"encoding/json"
)


type JsonError struct {
	Msg string
	Code string
}
func SendError (w http.ResponseWriter, r *http.Request, status int, jsonError JsonError){
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	jsonMap := map[string]interface{} {
		"msg": jsonError.Msg,
		"code": jsonError.Code,
	}

	data, _ := json.Marshal(jsonMap)

	w.Write(data)
}