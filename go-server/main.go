package main

import (
	"fmt"
	"go-server/controllers/auth"
	"go-server/controllers/csrf"
	"go-server/controllers/nails"
	"go-server/middleware"
	"go-server/middleware/verify"
	"go-server/services/cloudflare"
	"go-server/services/db"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)


func Chain(h http.Handler, middlewares ...func(http.Handler) http.Handler) http.Handler {
	for i := len(middlewares) - 1; i >= 0; i-- {
		h = middlewares[i](h)
	}
	return h
}

func main() {
	_ = godotenv.Load()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	db.Connect()
	db.Migrate()
	cloudflare.Connect()
	
	mux := http.NewServeMux()

	mux.HandleFunc("/api/auth/public", auth.GetPublicAuthToken)

	mux.Handle("/api/csrf", verify.VerifyPublicAuth(http.HandlerFunc(csrf.GetCsrfToken)))

	mux.Handle("/api/nails", verify.VerifyCsrf(http.HandlerFunc(nails.NailInfo)))
	handler := Chain(
		mux,
		middleware.LogginMiddleware,
		middleware.CorsHandler.Handler,
		middleware.BodyParser,
	)
	fmt.Printf("Server Running on %s\n", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), handler))
}