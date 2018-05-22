package controllers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/exec"
	"strings"

	"github.com/JinHyukParkk/CapstoneProject/GoogleAPI"
	"github.com/JinHyukParkk/CapstoneProject/models"
	"github.com/kljensen/snowball"
	"github.com/labstack/echo"
)

func ElasticPost(filename string, title string) error {
	url := "http://localhost:9200/mapping/titles"
	sArr := strings.Split(title, " ")
	var str string

	for _, s := range sArr {
		stemmed, err := snowball.Stem(s, "english", true)
		check(err)
		str += stemmed
		str += " "
	}
	doc := &models.TitleMapping{
		Title:    str,
		Filename: filename,
	}
	jsonValue, _ := json.Marshal(doc)

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonValue))
	check(err)

	req.Header.Set("X-Custom-Header", "myvalue")
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	check(err)

	defer resp.Body.Close()
	log.Println("response Status:", resp.Status)
	log.Println("response Headers:", resp.Header)
	body, _ := ioutil.ReadAll(resp.Body)
	log.Println("response Body:", string(body))
	return nil
}

func VideoUpload(c echo.Context) error {
	log.Println("Connection")

	form, err := c.MultipartForm()
	check(err)
	// 파일 받기
	title := c.FormValue("title")
	files := form.File["myfile1"]
	images := form.File["myfile2"]

	temp := files[0].Filename
	temp = strings.ToLower(temp)
	temp = strings.Replace(temp, " ", "_", -1)
	temp2 := strings.Split(temp, ".")
	imageName := temp2[0] + ".jpg"
	fileName := temp2[0] + "." + temp2[1]

	log.Println("File is good")
	log.Println("Video Title : " + title)
	log.Println("ImageName : " + imageName)
	log.Println("FileName : " + fileName)

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

		dst, err := os.Create("./audioFile/" + fileName)
		check(err)

		if _, err = io.Copy(dst, src); err != nil {
			return nil
		}
	}

	log.Println("====Post Elasticsearch about Title====")
	ElasticPost(fileName, title)
	log.Println("====Finish Elasticsearch about Title====")

	log.Println("====Upload CloudStorage====")
	googleApi.StorageUpload(fileName)
	googleApi.StorageUpload(imageName)
	log.Println("====Finish Upload CloudStorage====")

	log.Println("====Upload dataStroage====")
	googleApi.DataStoreUpload(fileName, imageName, title)
	log.Println("====Finish Upload dataStorage====")

	s := strings.Split(fileName, ".")
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
	log.Println("====Finish shell Script====")

	return c.HTML(http.StatusOK, fmt.Sprintf("<p>Uploaded successfully %d files with fields name=%s and email=%s.</p>", len(files), "test", "testEmail"))
}
