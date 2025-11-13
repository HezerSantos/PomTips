package auth

import (
	"net/http"
	"github.com/golang-jwt/jwt/v5"
	"time"
	"go-server/helpers"
	"os"
)

var jwtKey = []byte(os.Getenv("PUBLIC_AUTH_SECRET"))

func Get(w http.ResponseWriter, r *http.Request) {
	domainEnv := os.Getenv("ENV")
	if domainEnv == "production"{
		domainEnv = ".hallowedvisions.com"
	} else {
		domainEnv = ""
	}

	claims := jwt.MapClaims{
		"target": "guest",
		"exp": time.Now().Add(time.Minute * 15).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil{
		helpers.SendError(w, r, 500, helpers.JsonError{Msg: "Internal Server Error", Code: "INVALID_SERVER"})
	}
	cookie := &http.Cookie{
		Name: "__Secure-public-auth.access",
		Value: tokenString,
		Path: "/",
		Secure: true,
		HttpOnly: true,
		Expires: time.Now().Add(time.Minute * 15),
		Domain: domainEnv,
		SameSite: http.SameSiteNoneMode,
	}

	http.SetCookie(w, cookie)
}
func GetPublicAuthToken (w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET"{
		Get(w, r)
		return
	}
	helpers.SendError(w, r, 404, helpers.JsonError{Msg: "Method Not Found", Code: "INVALID_METHOD"})
}


