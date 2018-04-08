package models

type KeywordModel struct {
	Times []Time `json:"times"`
}
type Time struct {
	File_name  string `json:"file_name"`
	Start_Time string `json:"start_time"`
	End_Time   string `json:"end_time"`
}
