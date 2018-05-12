package controllers

import (
	"net/http"
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

	for _, data := range listData {
		if strings.Contains(data, ".mp4") {
			entity, err := googleApi.DataStoreRead(data)
			check(err)
			videoList = append(videoList, models.Video{Image_url: entity.Image_name, Title: entity.Title})
		}
	}

	u := &models.VideoListModel{
		Video_List: videoList,
		Total:      strconv.Itoa(len(listData)),
	}
	return c.JSON(http.StatusOK, u)
}
