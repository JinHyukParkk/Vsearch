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

func StorageUpload(object1 string) error {
	ctx := context.Background()

	//Client
	client, err := storage.NewClient(ctx)
	if err != nil {
		log.Fatal(err)
	}

	f, err := os.Open("./audioFile/" + object1)
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()

	//bucket
	bucketName := os.Getenv("cloudStorage")
	// bucket := client.Bucket(bucketName)

	wc := client.Bucket(bucketName).Object(object1).NewWriter(ctx)

	if _, err := io.Copy(wc, f); err != nil {
		log.Println(err)
		log.Panic(err)
	}

	if err := wc.Close(); err != nil {
		log.Println(err)
		log.Panic(err)
	}
	// open link
	acl := client.Bucket(bucketName).Object(object1).ACL()
	if err := acl.Set(ctx, storage.AllUsers, storage.RoleReader); err != nil {
		log.Fatal(err)
	}
	return nil

}
