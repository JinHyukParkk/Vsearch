package controllers

import "testing"

func TotalSearchTest(t *testing.T) {
	err := ElasticPost("test.mp4", "test")
	if err != nil {
		t.Error("error Storage Upload")
	}
}
