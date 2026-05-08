function getItems() {
  return JSON.parse(localStorage.getItem("items")) || [];
}

function saveItems(items) {
  localStorage.setItem("items", JSON.stringify(items));
}

function addItemData(name, expiry, category) {
  let items = getItems();
  items.push({
    id: Date.now(),
    name,
    expiry,
    category
  });
  saveItems(items);
}

function deleteItem(id) {
  let items = getItems().filter(item => item.id !== id);
  saveItems(items);
  renderInventory();
}

function clearAll() {
  localStorage.removeItem("items");
  renderInventory();
  renderDashboard();
}

function getCategoryIcon(cat) {
  switch (cat) {
    case "meat": return "🥩";
    case "dairy": return "🥛";
    case "vegetables": return "🥦";
    case "bread": return "🍞";
    default: return "🍽";
  }
}

function renderInventory(filter = "all") {
  let items = getItems();
  let list = document.getElementById("list");

  if (!list) return;

  list.innerHTML = "";

  let filtered = filter === "all"
    ? items
    : items.filter(i => i.category === filter);

  filtered.forEach(item => {
    let today = new Date();
    let expiry = new Date(item.expiry);
    let diff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

    let status = diff <= 2 
      ? `<span class="danger">⚠️ ${diff} дн</span>`
      : `<span class="good">✅ ${diff} дн</span>`;

    let div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <b>${getCategoryIcon(item.category)} ${item.name}</b><br>
      Срок: ${status}<br><br>
      <button onclick="deleteItem(${item.id})">❌ Удалить</button>
    `;

    list.appendChild(div);
  });
}

function renderDashboard() {
  let items = getItems();
  let total = items.length;
  let expiring = 0;

  items.forEach(item => {
    let today = new Date();
    let expiry = new Date(item.expiry);
    let diff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    if (diff <= 2) expiring++;
  });

  document.getElementById("total").innerText = total;
  document.getElementById("expiring").innerText = expiring;
}

//added Myrza
async function addItem(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;

    const expiry = document.getElementById("expiry").value;

    const category = document.getElementById("category").value;

    const quantity = document.getElementById("quantity").value;

    const response = await fetch("/api/add", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            name: name,

            expiry: expiry,

            category: category,

            quantity: Number(quantity)
        })
    });

    if (response.ok) {

        alert("Продукт добавлен!");

        window.location.href = "inventory.html";

    } else {

        alert("Ошибка!");
    }
}

async function loadInventory() {

    const response = await fetch("/api/inventory");

    const items = await response.json();

    const list = document.getElementById("inventory");

    list.innerHTML = "";

    items.forEach(item => {

        const li = document.createElement("li");

        li.innerHTML = `
            <b>${item.name}</b>
            (${item.category})
            - ${item.quantity} шт.
            <br>
            Срок: ${item.expiry}
            <hr>
        `;

        list.appendChild(li);
    });
}

async function loadInventory() {

  const response = await fetch("/api/inventory");

  const items = await response.json();

  const list = document.getElementById("inventory");

  list.innerHTML = "";

  items.forEach(item => {

    const li = document.createElement("li");

    li.innerHTML = `
    <b>${item.name}</b>
    (${item.category})
    - ${item.quantity} шт.
    <br>
    Срок: ${item.expiry}
    <hr>`;

    list.appendChild(li);
  });
}