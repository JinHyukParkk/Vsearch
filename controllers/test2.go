package controllers

import (
	"log"
	"net/http"

	"github.com/JinHyukParkk/CapstoneProject/GoogleAPI"
	"github.com/labstack/echo"
)

func Test2(c echo.Context) error {
	log.Println("hello test2")
	// f, err := os.Open("./audioFile/test.mp4")
	// check(err)

	// Read file to storage

	log.Println("Read File to Storage")
	f, err := googleApi.StorageRead("test.mp4")
	check(err)
	log.Println("Finish Read")

	return c.Blob(http.StatusOK, "video/mp4", f)
	// return c.Stream(http.StatusOK, "video/mp4", f)
	// return c.File("./audioFile/test.mp4")

	// response 로 json(cloud 서버 포함) or  Blob 보낼지 선택.
}
