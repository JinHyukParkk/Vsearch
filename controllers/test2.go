package controllers

import (
	"log"
	"net/http"
	"os"

	"github.com/labstack/echo"
)

func Test2(c echo.Context) error {
	log.Println("hello test2")
	f, err := os.Open("./audioFile/test.mp4")
	if err != nil {
		return err
	}

	return c.Stream(http.StatusOK, "video/mp4", f)
	// return c.File("./audioFile/test.mp4")
}
