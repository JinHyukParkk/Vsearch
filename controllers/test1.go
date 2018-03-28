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
			"10",
			"20",
		},
		{
			"30",
			"40",
		},
	}
	times = append(times, models.Time{"50", "60"})
	u := &models.Response{
		Times: times,
	}

	return c.JSON(http.StatusOK, u)
}
