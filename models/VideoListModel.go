package models

type VideoListModel struct {
	Video_List []Video `json:"video_list"`
	Total      string  `json:"total"`
}
type Video struct {
	File_name string `json:"file_name"`
}
