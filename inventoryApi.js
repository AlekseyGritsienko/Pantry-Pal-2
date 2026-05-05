const BASE_URL = "http://localhost:8080/api";

export async function getInventory() {
  const response = await fetch(`${BASE_URL}/inventory`);
  return response.json();
}

export async function createItem(item) {
  const response = await fetch(`${BASE_URL}/inventory`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  return response.json();
}