// Sample storage-quickstart creates a Google Cloud Storage bucket.
package googleApi

import (
	"fmt"
	"log"
	"os"

	// Imports the Google Cloud Storage client package.
	"cloud.google.com/go/storage"
	"golang.org/x/net/context"
	"google.golang.org/api/iterator"
)

func Upload() {
	ctx := context.Background()

	// Sets your Google C	loud Platform project ID.
	projectID := "capstoneproject-198705"

	// Creates a client.
	client, err := storage.NewClient(ctx)
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}

	// Sets the name for the new bucket.
	bucketName := os.Getenv("cloudStorage")
	log.Println(bucketName)

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
func ListAPI() ([]string, error) {
	ctx := context.Background()
	client, err := storage.NewClient(ctx)
	check(err)
	bucket := os.Getenv("cloudStorage")
	it := client.Bucket(bucket).Objects(ctx, nil)
	var objects []string
	for {
		attrs, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}
		// log.Println(attrs.Name)
		objects = append(objects, attrs.Name)
	}
	// [END storage_list_files]
	return objects, nil
}
