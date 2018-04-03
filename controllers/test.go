package controllers

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"os/exec"
	"strings"

	"github.com/JinHyukParkk/CapstoneProject/GoogleAPI"
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

	log.Println("====Upload CloudStorage====")
	googleApi.StorageUpload(files[0].Filename)
	log.Println("====Finish Upload CloudStorage====")

	s := strings.Split(files[0].Filename, ".")
	name, ty := s[0], s[1]

	log.Println("====Start shell Script====")
	cmdStr := "./shell/convertVoiveFile.sh " + name + " " + ty

	cmd := exec.Command("bash", cmdStr)

	if _, err := cmd.Output(); err != nil {
		return err
	}
	log.Println("====End shell Script====")

	return c.HTML(http.StatusOK, fmt.Sprintf("<p>Uploaded successfully %d files with fields name=%s and email=%s.</p>", len(files), "test", "testEmail"))
}

// speechApi.SpeechAPI()

// allowedHeaders := "Accept, Content-Type, Content-Length, Accept-Encoding, Authorization,X-CSRF-Token"
// w.Header().Set("Access-Control-Allow-Origin", "*")
// w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
// w.Header().Set("Access-Control-Allow-Headers", allowedHeaders)
// w.Header().Set("Access-Control-Expose-Headers", "Authorization")
// fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
