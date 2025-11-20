package middleware

import (
	"fmt"
	"net/http"
	"time"
)
const (
    Red    = "\033[31m"
    Green  = "\033[32m"
    Yellow = "\033[33m"
    Blue   = "\033[34m"
    Magenta = "\033[35m"
    Reset  = "\033[0m"
)

type ResponseRecorder struct {
	http.ResponseWriter
	statusCode int
}

func (rr *ResponseRecorder) WriteHeader(code int) {
	rr.statusCode = code
	rr.ResponseWriter.WriteHeader(code)

}

func LogginMiddleware (next http.Handler) http.Handler {
	return http.HandlerFunc(func (w http.ResponseWriter, r *http.Request) {
		scheme := "http"

		if r.TLS != nil {
			scheme = "https"
		}


		fmt.Printf(Yellow + "Request @ %s:\n", time.Now().Format("02 Jan 2006 03:04PM") + Reset)
		fmt.Printf("	Request Url: %s://%s%s\n", scheme, r.Host, r.URL.String())
		fmt.Printf("	From: %s\n", r.Header.Get("Origin"))
		fmt.Printf("	%s %s\n", r.Method, r.RequestURI)

		start := time.Now()
		responseRecorder := ResponseRecorder{ResponseWriter: w, statusCode: http.StatusOK}
		next.ServeHTTP(&responseRecorder, r)


		duration := time.Since(start)
		fmt.Printf(Green+ "	Status: %d %dms" + Reset, responseRecorder.statusCode, duration.Milliseconds())
		fmt.Println()
	})
}