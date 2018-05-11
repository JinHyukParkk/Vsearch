package controllers

import (
	"net/http"

	"github.com/labstack/echo"
)

func DeleteVideo(c echo.Context) error {
	filaname := c.Param("file")
	client := &http.Client{}
	req, err := http.NewRequest("DELETE", "http://localhost:9200/"+filaname+"?pretty", nil)
	check(err)
	resp, err := client.Do(req)
	check(err)
	defer resp.Body.Close()
	return c.NoContent(http.StatusOK)
	// return c.Redirect(http.StatusMovedPermanently, "http://localhost:8080")
}
