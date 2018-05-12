package main

import (
	"log"
	"os"
	// Imports the Google Cloud Datastore client package.
	"cloud.google.com/go/datastore"
	"github.com/JinHyukParkk/CapstoneProject/models"
	"golang.org/x/net/context"
)

func main() {
	var entity models.ImageVideo

	ctx := context.Background()
	videoName := "test.mp4"
	projectID := os.Getenv("GOOGLE_PROJECT_ID")

	client, err := datastore.NewClient(ctx, projectID)
	if err != nil {
		log.Fatal(err)
	}
	VideoKey := datastore.NameKey("VideoList", videoName, nil)

	if err := client.Get(ctx, VideoKey, &entity); err != nil {
		log.Println("ERROR")

	}
	log.Println(entity.Image_name)
	log.Println(entity.Title)
	log.Println(entity.Video_name)
}
