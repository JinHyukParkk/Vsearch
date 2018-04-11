package models

type KeywordModel struct {
	URL   string `json:url`
	Times []Time `json:"times"`
}
type Time struct {
	Start_Time string `json:"start_time"`
	End_Time   string `json:"end_time"`
}
