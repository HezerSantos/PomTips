package helpers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)
const (
    Red    = "\033[31m"
    Green  = "\033[32m"
    Yellow = "\033[33m"
    Blue   = "\033[34m"
    Magenta = "\033[35m"
    Reset  = "\033[0m"
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

func SendNetworkError(w http.ResponseWriter, r *http.Request, message string, err error){
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(500)
	jsonMap := map[string]interface{}{
		"msg": "Internal Server Error",
		"code": "INVALID_SERVER",
	}

	data, _ := json.Marshal(jsonMap)

	w.Write(data)

	indent := "    "
	stack := strings.ReplaceAll(err.Error(), "\n", "\n"+indent)
	fmt.Printf(Red + "	ERROR @ %s:\n", message + Reset)
	fmt.Printf(Magenta + "	STACK TRACE @ %s:\n", stack  + Reset)
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