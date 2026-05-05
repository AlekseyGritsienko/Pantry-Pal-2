import { useEffect, useState } from "react";
import { fetchItems, addItem } from "./services/inventoryService";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems().then(setItems);
  }, []);

  const handleAdd = async () => {
    const newItem = await addItem({
      name: "Bread",
      quantity: 2,
    });

    setItems([...items, newItem]);
  };

  return (
    <div>
      <h1>Inventory</h1>

      <button onClick={handleAdd}>Добавить</button>

      {items.map((item) => (
        <div key={item.id}>
          {item.name} - {item.quantity}
        </div>
      ))}
    </div>
  );
}

export default App;
