package main

import (
	"net/http"

	"github.com/JinHyukParkk/CapstoneProject/restServer/logger"
	"github.com/gorilla/mux"
)

func NewRouter() *mux.Router {
	// StrictSlash '/'를 써도 되고 안써도 되고
	router := mux.NewRouter().StrictSlash(true)
	for _, route := range routes {
		var handler http.Handler
		handler = route.HandlerFunc
		handler = logger.Logger(handler, route.Name)
		router.Methods(route.Method).Path(route.Pattern).Name(route.Name).Handler(route.HandlerFunc)
	}
	return router
}
