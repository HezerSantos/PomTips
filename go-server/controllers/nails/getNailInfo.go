package nails

import (
	"net/http"
)

func GetNailInfo(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Success"))
}