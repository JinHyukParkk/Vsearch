package main

import (
	"html/template"
	"io"

	"github.com/JinHyukParkk/CapstoneProject/controllers"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

// TemplateRenderer is a custom html/template renderer for Echo framework
type TemplateRenderer struct {
	templates *template.Template
}

// Render renders a template document
func (t *TemplateRenderer) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	// Add global methods if data is a map
	if viewContext, isMap := data.(map[string]interface{}); isMap {
		viewContext["reverse"] = c.Echo().Reverse
	}
	return t.templates.ExecuteTemplate(w, name, data)
}

func main() {
	e := echo.New()

	//middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	//CORS
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.PUT, echo.POST, echo.DELETE},
	}))

	// 둘 중 아무거나 써도 됨. js, css  파일 root directory 설정
	e.Use(middleware.Static("/static"))
	e.Static("/", "static")

	//처음 시작하는 파일 설정.
	e.File("/", "template/test.html")

	// route
	e.POST("/videoUpload", controllers.VideoUpload)
	e.GET("/keyword/:keyword", controllers.SearchKeyword)
	e.GET("/oneKeyword/:filename/:keyword", controllers.OneSearchKeyword)

	e.Logger.Fatal(e.Start(":8080"))
}
