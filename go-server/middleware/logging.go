package middleware

import (
	"fmt"
	"net/http"
	"time"
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


		fmt.Printf("Request @ %s:\n", time.Now().Format("02 Jan 2006 03:04PM"))
		fmt.Printf("	Request Url: %s://%s%s\n", scheme, r.Host, r.URL.String())
		fmt.Printf("	From: %s\n", r.Header.Get("Origin"))
		fmt.Printf("	%s %s\n", r.Method, r.RequestURI)

		start := time.Now()
		responseRecorder := ResponseRecorder{ResponseWriter: w, statusCode: http.StatusOK}
		next.ServeHTTP(&responseRecorder, r)


		duration := time.Since(start)
		fmt.Printf("	Status: %d %dms", responseRecorder.statusCode, duration.Milliseconds())
		fmt.Println()
	})
}