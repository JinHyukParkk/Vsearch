package apis

import (
	"net/http"

	"github.com/labstack/echo"
)

type User struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

func Test1(c echo.Context) error {
	u := &User{
		Name:  "Jon",
		Email: "jon@naver.com",
	}
	return c.JSON(http.StatusOK, u)
}
