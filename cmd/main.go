package main

import (
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
)

func main() {
	r := chi.NewRouter()

	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("ok"))
	})

	r.Get("/inventory", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		response := `[{"name":"Milk","quantity":1}]`
		w.Write([]byte(response))
	})

	r.Post("/inventory", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		response := `{"message":"item created"}`
		w.Write([]byte(response))
	})

	log.Println("Server started on :8080")
	http.ListenAndServe(":8080", r)
}
