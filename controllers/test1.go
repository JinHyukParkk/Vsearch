package controllers

import (
	"log"
	"net/http"

	"github.com/JinHyukParkk/CapstoneProject/models"
	"github.com/labstack/echo"
)

func Test1(c echo.Context) error {
	log.Println("hello test1")
	times := []models.Time{
		{
			"111",
			"222",
		},
		{
			"333",
			"444",
		},
	}
	times = append(times, models.Time{"555", "666"})
	u := &models.Response{
		Times: times,
	}

	return c.JSON(http.StatusOK, u)
}
