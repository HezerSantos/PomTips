package helpers
import (
    "fmt"
    "github.com/golang-jwt/jwt/v5"
)


func VerifyJWT(tokenString string, secret string) (*jwt.MapClaims, error) {
	jwtKey := []byte(secret)
    token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
        // Make sure token method is HS256
        if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
            return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
        }
        return jwtKey, nil
    })

    if err != nil {
        return nil, err
    }

    if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
        return &claims, nil
    }

    return nil, fmt.Errorf("invalid token")
}