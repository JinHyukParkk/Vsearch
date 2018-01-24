package apis

import (
	"log"
	"net/http"
)

func Test(w http.ResponseWriter, r *http.Request) {
	log.Println("test")
}
