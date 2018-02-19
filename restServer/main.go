package main

import (
	"log"
	"net/http"

	"github.com/JinHyukParkk/CapstoneProject/restServer/router"
)

func main() {
	router := router.NewRouter()

	log.Fatal(http.ListenAndServe(":8090", router))
}
