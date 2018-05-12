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
	check(err)

	title := c.FormValue("title")
	images := form.File["myfile2"]
	files := form.File["myfile1"]

	temp := files[0].Filename
	temp2 := strings.Split(temp, ".")
	imageName := temp2[0] + ".jpg"

	log.Println("File is good")
	log.Println("Video Title : " + title)
	log.Println("ImageName : " + imageName)
	for _, image := range images {
		src, err := image.Open()
		check(err)

		defer src.Close()

		dst, err := os.Create("./audioFile/" + imageName)
		check(err)

		if _, err = io.Copy(dst, src); err != nil {
			return nil
		}
	}

	for _, file := range files {
		src, err := file.Open()
		check(err)

		defer src.Close()

		dst, err := os.Create("./audioFile/" + file.Filename)
		check(err)

		if _, err = io.Copy(dst, src); err != nil {
			return nil
		}
	}

	log.Println("====Upload CloudStorage====")
	googleApi.StorageUpload(files[0].Filename)
	googleApi.StorageUpload(imageName)
	log.Println("====Finish Upload CloudStorage====")

	log.Println("====Upload dataStroage====")
	googleApi.DataStorageUpload(files[0].Filename, imageName, title)
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
