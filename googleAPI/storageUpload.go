// Sample storage-quickstart creates a Google Cloud Storage bucket.
package googleApi

import (
	"context"
	"io"
	"log"
	"os"

	"cloud.google.com/go/storage"
)

// Imports the Google Cloud Storage client package.

func Upload(object string) {
	ctx := context.Background()

	//Client
	client, err := storage.NewClient(ctx)
	if err != nil {
		log.Fatal(err)
	}
	f, err := os.Open(object)
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()

	//bucket
	// bucketName := "testvideostore"
	// bucket := client.Bucket(bucketName)

	wc := client.Bucket("testvideostore").Object("test.mp4").NewWriter(ctx)
	if _, err := io.Copy(wc, f); err != nil {
		log.Fatal(err)
	}
	if err := wc.Close(); err != nil {
		log.Fatal(err)
	}
}
