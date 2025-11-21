package csrf

import (
	cRand "crypto/rand"
	"encoding/hex"
	"fmt"
	"go-server/helpers"
	mRand "math/rand"
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var CSRF_SECRET = []byte(os.Getenv("CSRF_SECRET"))

func GenerateCsrf() (*http.Cookie, error) {
	domainEnv := os.Getenv("ENV")
	if domainEnv == "production"{
		domainEnv = ".hallowedvisions.com"
	} else {
		domainEnv = ""
	}
	b := make([]byte, 32)
	_, err := cRand.Read(b)
	if err != nil{
		// helpers.SendError(w, r, 500, helpers.JsonError{Msg: "Internal Server Error", Code: "INVALID_SERVER"})
		return nil, fmt.Errorf("ERROR")
	}
	csrfValue := hex.EncodeToString(b)
	claims := jwt.MapClaims{
		"csrfToken": csrfValue,
		"key": mRand.Intn(10),
		"exp": time.Now().Add(time.Minute * 5).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(CSRF_SECRET)
	if err != nil{
		// helpers.SendError(w, r, 500, helpers.JsonError{Msg: "Internal Server Error", Code: "INVALID_SERVER"})
		return nil, fmt.Errorf("ERROR")
	}

	cookie := &http.Cookie{
		Name: "__Secure-auth.csrf",
		Value: tokenString,
		HttpOnly: false,
		Secure: true,
		Expires: time.Now().Add(time.Minute * 5),
		Path: "/",
		Domain: domainEnv,
	}

	return cookie, nil
}

func Get(w http.ResponseWriter, r *http.Request) {
	cookie, err := GenerateCsrf()
	if err != nil {
		helpers.SendError(w, r, 500, helpers.JsonError{Msg: "Internal Server Error", Code: "INVALID_SERVER"})
		return
	}
	http.SetCookie(w, cookie)
}
func GetCsrfToken(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		Get(w, r)
		return
	}

	helpers.SendError(w, r, 404, helpers.JsonError{Msg: "Method Not Found", Code: "INVALID_METHOD"})
}