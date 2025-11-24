package cloudflare

import (
	"context"
	"fmt"
	"go-server/helpers"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)


var R2 *s3.Client
var PresignClient *s3.PresignClient
func Connect() {
	accountId := os.Getenv("CF_ACCOUNT_ID")
	accessId := os.Getenv("CF_ACCESS_ID")
	accessSecret := os.Getenv("CF_ACCESS_SECRET")

	cfg, err := config.LoadDefaultConfig(context.TODO(),
		config.WithCredentialsProvider(credentials.NewStaticCredentialsProvider(accessId, accessSecret, "")),
		config.WithRegion("auto"),
	)
	if err != nil {
    	log.Fatal(err)
  	}

	R2 = s3.NewFromConfig(cfg, func(o *s3.Options) {
      o.BaseEndpoint = aws.String(fmt.Sprintf("https://%s.r2.cloudflarestorage.com", accountId))
	  o.UsePathStyle = true
	})

	PresignClient = s3.NewPresignClient(R2)
}

func StoreImage(bucketName string, key string, file io.Reader, contentType string, w http.ResponseWriter, r *http.Request) bool {
	_, err := R2.PutObject(context.TODO(), &s3.PutObjectInput{
		Bucket: aws.String(bucketName),
		Key: aws.String(key),
		Body: file,
		ContentType: aws.String(contentType),
	})
	fmt.Println(err)
	if err != nil {
		helpers.SendNetworkError(w, r, "CLOUDFLARE PUT ERROR", err)
		return false
	}
	return true
}