package controllers

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/JinHyukParkk/CapstoneProject/models"
	"github.com/kljensen/snowball"
	"github.com/labstack/echo"
)

func FloatToString1(input_num float64) string {
	// to convert a float number to a string
	return strconv.FormatFloat(input_num, 'f', 3, 32)
}

func calcul_second(time string) float64 {
	timesArr := strings.Split(time, ".")
	timeArr := strings.Split(timesArr[0], ":")
	var sum float64 = 0
	hour, _ := strconv.ParseFloat(timeArr[0], 32)
	sum += 3600 * hour
	minite, _ := strconv.ParseFloat(timeArr[1], 32)
	sum += 60 * minite
	second, _ := strconv.ParseFloat(timeArr[2]+"."+timesArr[1], 32)
	sum += second
	return sum
}
func OneSearchKeyword(c echo.Context) error {
	keyword := c.Param("keyword")
	filename := c.Param("filename")
	sArr := strings.Split(keyword, " ")
	var str string

	for _, s := range sArr {
		stemmed, err := snowball.Stem(s, "english", true)
		check(err)
		str += stemmed
		str += " "
	}
	log.Println(keyword, filename)
	// Create elastic request url
	url := "http://localhost:9200/" + filename + "/_search?q=content:" + keyword
	resp, err := http.Get(url)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	data, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}

	var dat map[string]interface{}
	if err := json.Unmarshal(data, &dat); err != nil {
		panic(err)
	}

	time_list := []models.Time{}
	dat1 := dat["hits"].(map[string]interface{})
	// log.Println(dat1)
	dat2 := dat1["hits"].([]interface{})

	for _, d := range dat2 {
		log.Println(d)
		dat3 := d.(map[string]interface{})
		dat4 := dat3["_source"].(map[string]interface{})
		time_list = append(time_list, models.Time{FloatToString1(calcul_second(dat4["start_time"].(string))), FloatToString1(calcul_second(dat4["end_time"].(string)))})
	}
	u := &models.KeywordModel{
		Times: time_list,
	}
	return c.JSON(http.StatusOK, u)
}

// times := []models.Time{
// 	{
// 		dat3["_type"].(string),
// 		FloatToString(calcul_second(dat4["start_time"].(string))),
// 		FloatToString(calcul_second(dat4["end_time"].(string))),
// 	},
// 	{
// 		dat3["_type"].(string),
// 		"30",
// 		"40",
// 	},
// }
// times = append(times, models.Time{dat3["_type"].(string), "50", "60"})
