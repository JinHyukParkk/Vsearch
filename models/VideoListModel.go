package models

type VideoListModel struct {
	Video_List []Video `json:"video_list"`
	Total      string  `json:"total"`
}
type Video struct {
	Image_url string `json:"image_url"`
	Title     string `json:"title"`
}
