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

func VideoUpload(c echo.Context) error {
	log.Println("Connection")

	form, err := c.MultipartForm()
	if err != nil {
		return err
	}

	files := form.File["myfile1"]
	log.Println("File is good")

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

	log.Println("====Upload dataStroage====")
	googleApi.DataStorageUpload(files[0].Filename, files[0].Filename, "temp_title")
	log.Println("====Finish Upload dataStorage====")

	s := strings.Split(files[0].Filename, ".")
	name, ty := s[0], s[1]

	log.Println("====Start shell Script====")
	cmdStr := "./shell/convertVoiveFile.sh"
	log.Println(cmdStr)
	// 쉘 사용 방법 : 0, 1, 2
	cmd := exec.Command("bash", cmdStr, name, ty)

	log.Println("====shell Scripting====")
	if _, err := cmd.Output(); err != nil {
		return err
	}
	log.Println("====End shell Script====")

	return c.HTML(http.StatusOK, fmt.Sprintf("<p>Uploaded successfully %d files with fields name=%s and email=%s.</p>", len(files), "test", "testEmail"))
}
