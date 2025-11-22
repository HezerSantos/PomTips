package helpers

import (
	"net/http"
	"encoding/json"
)

type ValidationError struct{
	Path string `json:"path"`
	Msg string	`json:"msg"`
}
type JsonError struct {
	Msg string `json:"msg"`
	Code string `json:"code"`
	ValidationErrors *[]ValidationError `json:"validationErrors"`
}
func SendError (w http.ResponseWriter, r *http.Request, status int, jsonError JsonError){
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	data, _ := json.Marshal(jsonError)

	w.Write(data)
}

func SendNetworkError(w http.ResponseWriter, r *http.Request){
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(500)
	jsonMap := map[string]interface{}{
		"msg": "Internal Server Error",
		"code": "INVALID_SERVER",
	}

	data, _ := json.Marshal(jsonMap)

	w.Write(data)
}

func SendMethodError(w http.ResponseWriter, r *http.Request){
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(405)
	jsonMap := map[string]interface{}{
		"msg": "Method Not Found",
		"code": "INVALID_METHOD",
	}

	data, _ := json.Marshal(jsonMap)

	w.Write(data)
}