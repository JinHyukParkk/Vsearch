package router

import (
	"net/http"

	"github.com/JinHyukParkk/CapstoneProject/restServer/apis"
)

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type Routes []Route

var routes = Routes{
	Route{"Test", "POST", "/test", apis.Test},
}
