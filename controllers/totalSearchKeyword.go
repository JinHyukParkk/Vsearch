package controllers

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/JinHyukParkk/CapstoneProject/GoogleAPI"
	"github.com/JinHyukParkk/CapstoneProject/models"
	"github.com/kljensen/snowball"
	"github.com/labstack/echo"
)

func FloatToString(input_num float64) string {
	// to convert a float number to a string
	return strconv.FormatFloat(input_num, 'f', 0, 32)
}
func ElasticGet(url string, data []byte) ([]byte, error) {
	req, err := http.NewRequest("GET", url, bytes.NewBuffer(data))
	req.Header.Set("X-Custom-Header", "myvalue")
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	check(err)

	defer resp.Body.Close()

	return ioutil.ReadAll(resp.Body)
}
func SearchKeyword(c echo.Context) error {
	log.Println("SearchKeyword Method")
	keyword := c.Param("keyword")
	// Steming
	sArr := strings.Split(keyword, " ")
	var str string
	for _, s := range sArr {
		stemmed, err := snowball.Stem(s, "english", true)
		check(err)
		str += stemmed
		str += " "
	}
	log.Println(str)
	// Create elastic request url
	url := "http://localhost:9200/_search"
	var jsonStr = []byte(`{
		"query":{
			"match_phrase": {
			  "content": "` + str + `"
			}
		},		
		"size": 0,
		"aggs": {
		  "group_by_state": {
			"terms": {
			  "field": "_index"
			}
		  }
		}
	  }`)

	data, err := ElasticGet(url, jsonStr)
	check(err)

	var dat map[string]interface{}

	if err := json.Unmarshal(data, &dat); err != nil {
		panic(err)
	}
	log.Println(dat)
	video_list := []models.VideoInfo{}
	count := 0

	dat1 := dat["aggregations"].(map[string]interface{})
	dat2 := dat1["group_by_state"].(map[string]interface{})
	dat3 := dat2["buckets"].([]interface{})

	for _, d := range dat3 {
		dat4 := d.(map[string]interface{})
		log.Println(dat4["key"].(string))
		if dat4["key"].(string) != "mapping" {
			entity, err := googleApi.DataStoreRead(dat4["key"].(string) + ".mp4")
			check(err)
			image_url := "https://storage.googleapis.com/" + os.Getenv("cloudStorage") + "/" + entity.Image_name
			video_url := "https://storage.googleapis.com/" + os.Getenv("cloudStorage") + "/" + entity.Video_name
			video_list = append(video_list, models.VideoInfo{"keyword", image_url, video_url, entity.Title, FloatToString(dat4["doc_count"].(float64))})
			count++
		}
	}

	log.Println("=======Keyword Search Success=======")

	title_url := "http://localhost:9200/mapping/titles/_search"
	title_jsonStr := []byte(`{
		"query":{
			"match_phrase": {
				"title": "` + str + `"
			}

		}
	}`)
	title_data, err := ElasticGet(title_url, title_jsonStr)
	check(err)

	var title_dat map[string]interface{}

	if err := json.Unmarshal(title_data, &title_dat); err != nil {
		panic(err)
	}
	title_dat1 := title_dat["hits"].(map[string]interface{})
	title_dat2 := title_dat1["hits"].([]interface{})

	for _, d := range title_dat2 {
		title_dat3 := d.(map[string]interface{})
		title_dat4 := title_dat3["_source"].(map[string]interface{})
		entity, err := googleApi.DataStoreRead(title_dat4["filename"].(string))
		check(err)
		image_url := "https://storage.googleapis.com/" + os.Getenv("cloudStorage") + "/" + entity.Image_name
		video_url := "https://storage.googleapis.com/" + os.Getenv("cloudStorage") + "/" + entity.Video_name
		video_list = append(video_list, models.VideoInfo{"title", image_url, video_url, entity.Title, "0"})
		count++
	}
	log.Println("=======Title Search Success=======")

	u := &models.KeywordVideoModel{
		Video_List: video_list,
		Total:      strconv.Itoa(count),
	}

	return c.JSON(http.StatusOK, u)
}
