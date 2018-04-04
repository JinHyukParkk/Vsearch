// Sample storage-quickstart creates a Google Cloud Storage bucket.
package googleApi

import (
	"context"
	"io/ioutil"
	"os"

	"cloud.google.com/go/storage"
)

// Imports the Google Cloud Storage client package.

func StorageRead(object string) ([]byte, error) {
	ctx := context.Background()

	//Client
	client, err := storage.NewClient(ctx)
	check(err)
	bucket := os.Getenv("cloudStorage")
	rc, err := client.Bucket(bucket).Object(object).NewReader(ctx)
	check(err)
	defer rc.Close()
	// log.Println("rc Read")
	data, err := ioutil.ReadAll(rc)
	// log.Println("Finish rc Read")
	check(err)

	return data, nil
}
