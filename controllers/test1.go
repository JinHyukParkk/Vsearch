package controllers

import (
	"log"
	"net/http"

	"github.com/labstack/echo"
)

type Response struct {
	Times []Time `json:"times"`
}
type Time struct {
	Start_Time string `json:"start_time"`
	End_Time   string `json:"end_time"`
}

func Test1(c echo.Context) error {
	log.Println("hello test1")
	times := []Time{
		Time{
			"111",
			"222",
		},
		Time{
			"333",
			"444",
		},
	}
	u := &Response{
		Times: times,
	}
	return c.JSON(http.StatusOK, u)
}
