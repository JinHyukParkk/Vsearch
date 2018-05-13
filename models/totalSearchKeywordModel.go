package models

type KeywordVideoModel struct {
	Video_List []VideoInfo `json:"video_list"`
	Total      string      `json:"total"`
}
type VideoInfo struct {
	SearchType string `json:"serach_type"`
	Filename   string `json:"filename"`
	Image_url  string `json:"image_url"`
	Video_url  string `json:"video_url"`
	Title      string `json:"title"`
	Count      string `json:"count`
}
