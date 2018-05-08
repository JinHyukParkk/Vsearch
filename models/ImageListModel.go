package models

type ImageVideo struct {
	Image_name string `datastore:"imagename"`
	Video_name string `datastore:"videoname"`
}
