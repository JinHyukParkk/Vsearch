package main

import (
	"github.com/JinHyukParkk/CapstoneProject/testRestServer/apis"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.PUT, echo.POST, echo.DELETE},
	}))
	e.Static("/", "public")
	e.POST("/test", apis.Test)

	e.Logger.Fatal(e.Start(":8080"))
}
