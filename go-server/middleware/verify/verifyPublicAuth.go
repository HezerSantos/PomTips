package verify


import (
	"net/http"
	"os"
	"go-server/helpers"
)

var PUBLIC_AUTH_SECRET = os.Getenv("PUBLIC_AUTH_SECRET")
func VerifyPublicAuth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("__Secure-public-auth.access")
		if err != nil {
			helpers.SendError(w, r, 401, helpers.JsonError{Msg: "Unauthorized", Code: "INVALID_ENTRY_TOKEN"})
			return
		}
		publicAuthToken := cookie.Value

		_, err = helpers.VerifyJWT(publicAuthToken, PUBLIC_AUTH_SECRET)

		if err != nil {
			helpers.SendError(w, r, 401, helpers.JsonError{Msg: "Unauthorized", Code: "INVALID_ENTRY_TOKEN"})
			return
		}

		next.ServeHTTP(w, r)
	})
}