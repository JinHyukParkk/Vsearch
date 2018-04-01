// Sample storage-quickstart creates a Google Cloud Storage bucket.
package googleApi

import (
	"fmt"
	"log"

	// Imports the Google Cloud Storage client package.
	"cloud.google.com/go/storage"
	"golang.org/x/net/context"
)

func MakeStorage() {
	ctx := context.Background()

	// Sets your Google C	loud Platform project ID.
	projectID := "absolute-hook-187312"

	// Creates a client.
	client, err := storage.NewClient(ctx)
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}

	// Sets the name for the new bucket.
	bucketName := "testvideostore"

	// Creates a Bucket instance.
	bucket := client.Bucket(bucketName)

	// Creates the new bucket.
	if err := bucket.Create(ctx, projectID, &storage.BucketAttrs{
		StorageClass: "Multi-Regional",
		Location:     "asia",
	}); err != nil {
		log.Fatalf("Failed to create bucket: %v", err)
	}

	fmt.Printf("Bucket %v created.\n", bucketName)
}
func delete(bucketName string) error {
	ctx := context.Background()

	client, err := storage.NewClient(ctx)
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}
	// [START delete_bucket]
	if err := client.Bucket(bucketName).Delete(ctx); err != nil {
		return err
	}
	// [END delete_bucket]
	return nil
}
