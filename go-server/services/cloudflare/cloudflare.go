package cloudflare


import (
	"os"
	"context"
	"fmt"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"log"
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