package apis

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/JinHyukParkk/CapstoneProject/testRestServer/speechApi"
	"github.com/labstack/echo"
)

func Test(c echo.Context) error {
	// params := mux.Vars(r)
	log.Println("Connection")

	form, err := c.MultipartForm()
	if err != nil {
		return err
	}
	files := form.File["myfile1"]

	log.Println("File is good")
	// log.Println(handler.Filename)
	log.Println()
	// log.Println(handler.Header)

	for _, file := range files {
		src, err := file.Open()
		if err != nil {
			return err
		}
		defer src.Close()

		dst, err := os.Create("./audioFile/" + file.Filename)
		if err != nil {
			return nil
		}

		if _, err = io.Copy(dst, src); err != nil {
			return nil
		}
	}
	speechApi.SpeechAPI()
	return c.HTML(http.StatusOK, fmt.Sprintf("<p>Uploaded successfully %d files with fields name=%s and email=%s.</p>", len(files), "test", "testEmail"))
}

// allowedHeaders := "Accept, Content-Type, Content-Length, Accept-Encoding, Authorization,X-CSRF-Token"
// w.Header().Set("Access-Control-Allow-Origin", "*")
// w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
// w.Header().Set("Access-Control-Allow-Headers", allowedHeaders)
// w.Header().Set("Access-Control-Expose-Headers", "Authorization")
// fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
