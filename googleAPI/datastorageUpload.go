package googleApi

import (
	"log"
	"os"

	// Imports the Google Cloud Datastore client package.
	"cloud.google.com/go/datastore"
	"github.com/JinHyukParkk/CapstoneProject/models"
	"golang.org/x/net/context"
)

func DataStorageUpload(video string, image string, title string) {
	ctx := context.Background()

	// Set your Google Cloud Platform project ID.
	projectID := os.Getenv("GOOGLE_PROJECT_ID")

	// Creates a client.
	client, err := datastore.NewClient(ctx, projectID)
	if err != nil {
		log.Fatal(err)
	}

	// Creates a Task instance.
	task := &models.ImageVideo{
		Image_name: image,
		Video_name: video,
		Title:      title,
	}

	key := datastore.IncompleteKey("VideoList", nil)

	// Saves the new entity.
	if _, err := client.Put(ctx, key, task); err != nil {
		log.Fatal(err)
	}
}
