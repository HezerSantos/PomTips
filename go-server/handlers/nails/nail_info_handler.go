package nails

import (
	"context"
	"encoding/json"
	"fmt"
	"go-server/helpers"
	"go-server/services/cloudflare"
	"go-server/services/db"
	"net/http"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)



func generateUrl(nailInfo *db.NailInfo) (interface{}, error){
	bucketName := "pomtips"
	presignResult, err := cloudflare.PresignClient.PresignGetObject(context.TODO(), &s3.GetObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(fmt.Sprintf("NailInfo/%s", nailInfo.ImageUrl)),
	})
	if err != nil {
		return nil, fmt.Errorf("CLOUDFLARE URL ERROR")
  	}
	nailInfo.ImageUrl = presignResult.URL
	return  nil, nil
}
func Get(w http.ResponseWriter, r *http.Request){
	var nailInfoArray []*db.NailInfo

	result := db.DB.Find(&nailInfoArray)

	if result.Error != nil {
		fmt.Println("	DB ERROR")
		helpers.SendNetworkError(w, r)
		return
	}

	for _, nailInfo := range nailInfoArray {

		_, err := generateUrl(nailInfo)

		if err != nil {
			fmt.Println("	CLOUDFLARE ERROR")
			helpers.SendNetworkError(w, r)
			return
		}
	}

	jsonMap := map[string]interface{} {
		"nailInfo": nailInfoArray,
	}

	data, _ := json.Marshal(jsonMap)

	w.Write(data)
}	

func NailInfoHandler(w http.ResponseWriter, r *http.Request) {

	if r.Method == "GET"{
		Get(w, r)
		return
	}

	helpers.SendMethodError(w, r)
}