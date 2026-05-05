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