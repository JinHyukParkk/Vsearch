package controllers

import (
	"log"
	"os"

	"github.com/JinHyukParkk/CapstoneProject/GoogleAPI"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}
func test3() {
	log.Println("hello test3")
	// f, err := os.Open("./audioFile/test.mp4")
	// check(err)

	// Read file to storage

	log.Println("Read File to Storage")
	f, err := googleApi.StorageRead("test.mp4")
	check(err)
	log.Println("Finish Read")
	dst, err := os.Create("./" + "test.mp4")
	check(err)

	// if _, err = io.Copy(dst, f); err != nil {
	if _, err = dst.Write(f); err != nil {
		log.Fatal(err)
	}

	// return c.Blob(http.StatusOK, "video/mp4", f)
	// return c.Stream(http.StatusOK, "video/mp4", f)
	// return c.File("./audioFile/test.mp4")
}
