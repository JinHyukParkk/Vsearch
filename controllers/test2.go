package controllers

import (
	"log"
	"net/http"
	"os"

	"github.com/JinHyukParkk/CapstoneProject/models"
	"github.com/labstack/echo"
)

func Test2(c echo.Context) error {
	log.Println("hello test2")
	bucket := os.Getenv("cloudStorage")
	url := "https://storage.googleapis.com/" + bucket + "/test.mp4"
	res_url := models.Response1{
		Url: url,
	}
	// Read file to storage

	return c.JSON(http.StatusOK, res_url)
	// return c.File("./audioFile/test.mp4")
}

// f, err := os.Open("./audioFile/test.mp4")
// check(err)
// return c.Stream(http.StatusOK, "video/mp4", f)

// log.Println("Read File to Storage")
// f, err := googleApi.StorageRead("test.mp4")
// check(err)
// log.Println("Finish Read")
// return c.Blob(http.StatusOK, "video/mp4", f)

// response 로 json(cloud 서버 포함) or  Blob 보낼지 선택.
