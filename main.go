package main

import (
	"fmt"
	"html/template"
	"io"
	"net/http"

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
func customHTTPErrorHandler(err error, c echo.Context) {
	code := http.StatusInternalServerError
	if he, ok := err.(*echo.HTTPError); ok {
		code = he.Code
	}
	errorPage := fmt.Sprintf("errorHtml/%d.html", code)
	if err := c.File(errorPage); err != nil {
		c.Logger().Error(err)
	}
	c.Logger().Error(err)
}
func main() {
	e := echo.New()

	//HTTP Error Handler
	e.HTTPErrorHandler = customHTTPErrorHandler
	//middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	//CORS
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.PUT, echo.POST, echo.DELETE},
	}))

	// 둘 중 아무거나 써도 됨. js, css  파일 root directory 설정
	// e.Use(middleware.Static("/static"))
	e.Static("/", "static")

	//처음 시작하는 파일 설정.
	e.File("/", "template/index.html")

	// route
	e.GET("/videoList", controllers.VideoList)
	e.POST("/videoUpload", controllers.VideoUpload)
	e.GET("/keyword/:keyword", controllers.SearchKeyword)
	e.GET("/oneKeyword/:filename/:keyword", controllers.OneSearchKeyword)

	e.Logger.Fatal(e.Start(":8080"))
}
