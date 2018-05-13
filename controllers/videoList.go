package controllers

import (
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/JinHyukParkk/CapstoneProject/GoogleAPI"
	"github.com/JinHyukParkk/CapstoneProject/models"
	"github.com/labstack/echo"
)

func VideoList(c echo.Context) error {

	listData, err := googleApi.ListAPI()
	check(err)
	videoList := []models.Video{}
	log.Println("====VideoList Start====")
	for _, data := range listData {
		if strings.Contains(data, ".mp4") {
			log.Println("=====" + data + "=====")
			entity, err := googleApi.DataStoreRead(data)
			check(err)
			image_url := "https://storage.googleapis.com/" + os.Getenv("cloudStorage") + "/" + entity.Image_name
			video_url := "https://storage.googleapis.com/" + os.Getenv("cloudStorage") + "/" + entity.Video_name
			s := strings.Split(data, ".")
			videoList = append(videoList, models.Video{Video_url: video_url, Image_url: image_url, Title: entity.Title, File_name: s[0]})
		}
	}
	u := &models.VideoListModel{
		Video_List: videoList,
		Total:      strconv.Itoa(len(listData)),
	}
	return c.JSON(http.StatusOK, u)
}
