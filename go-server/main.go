package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"github.com/joho/godotenv"
	"go-server/middleware"
	"go-server/controllers/auth"
)


func main() {
	_ = godotenv.Load()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	mux := http.NewServeMux()

	mux.HandleFunc("/api/auth/public", http.HandlerFunc(auth.GetPublicAuthToken))
	fmt.Printf("Server Running on %s\n", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), middleware.CorsHandler.Handler(middleware.BodyParser(mux))))
}