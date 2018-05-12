package googleApi

import "testing"

func TestStorageUpload(t *testing.T) {
	err := StorageUpload("test.mp4")
	if err != nil {
		t.Error("error Storage Upload")
	}
}
