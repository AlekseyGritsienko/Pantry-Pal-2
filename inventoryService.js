import { getInventory, createItem } from "../api/inventoryApi";
import { mockItems } from "../mocks/inventoryMock";

const USE_MOCK = true; //здесь поменять на false, когда будет готов бэкенд

export async function fetchItems() {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockItems), 500);
    });
  }

  return await getInventory();
}

export async function addItem(item) {
  if (USE_MOCK) {
    const newItem = {
      id: Date.now(),
      ...item,
    };
    mockItems.push(newItem);
    return newItem;
  }

  return await createItem(item);
}