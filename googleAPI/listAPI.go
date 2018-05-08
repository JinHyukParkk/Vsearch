package googleApi

import (
	"context"
	"os"

	"cloud.google.com/go/storage"
	"google.golang.org/api/iterator"
)

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
