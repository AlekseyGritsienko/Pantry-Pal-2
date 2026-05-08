package main

import (
	"encoding/json"
	"net/http"
)

type Item struct {
	Name     string `json:"name"`
	Expiry   string `json:"expiry"`
	Category string `json:"category"`
	Quantity int    `json:"quantity"`
}
var inventory []Item

// получить список продуктов
func getInventory(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(inventory)
}

// добавить продукт
func addItem(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
		return
	}

	var item Item

	err := json.NewDecoder(r.Body).Decode(&item)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	inventory = append(inventory, item)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(item)
}

func main() {

	// API
	http.HandleFunc("/api/inventory", getInventory)
	http.HandleFunc("/api/add", addItem)

	// frontend
	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/", fs)

	println("Server started at http://localhost:8080")

	http.ListenAndServe(":8080", nil)
}