package models

type ImageVideo struct {
	Title      string `datastore:"title"`
	Image_name string `datastore:"imagename"`
	Video_name string `datastore:"videoname"`
}
