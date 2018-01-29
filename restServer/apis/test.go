package apis

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/JinHyukParkk/CapstoneProject/restServer/speechApi"
)

func Test(w http.ResponseWriter, r *http.Request) {
	// params := mux.Vars(r)
	log.Println("Connection")
	if r.Method == "POST" {
		log.Println("POST OK")
	}

	file, handler, err := r.FormFile("myfile1")

	log.Println("File is good")
	log.Println(handler.Filename)
	log.Println()
	log.Println(handler.Header)
	f, err := os.Create("./audioFile/test.mp4")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer f.Close()
	io.Copy(f, file)

	allowedHeaders := "Accept, Content-Type, Content-Length, Accept-Encoding, Authorization,X-CSRF-Token"
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", allowedHeaders)
	w.Header().Set("Access-Control-Expose-Headers", "Authorization")
	// fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))

	speechApi.SpeechAPI()

}
