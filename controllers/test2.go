package controllers

import (
	"log"

	"github.com/labstack/echo"
)

func Test2(c echo.Context) error {
	log.Println("hello test2")
	// f, err := os.Open("./audioFile/test.mp4")
	// if err != nil {
	// 	return err
	// }

	return c.File("./audioFile/test.mp4")
}
