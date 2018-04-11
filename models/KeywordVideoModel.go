package models

type KeywordVideoModel struct {
	Video_List []VideoInfo `json:"video_list"`
	Total      string      `json:"total"`
}
type VideoInfo struct {
	File_name string `json:"file_name"`
	Count     string `json:"count`
}
