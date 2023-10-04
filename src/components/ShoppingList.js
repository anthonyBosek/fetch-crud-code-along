import { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

const ShoppingList = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  //! READ
  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((resp) => resp.json())
      .then((items) => setItems(items))
      .catch((err) => console.log(err));
  }, []);

  //! CREATE
  const handleAddItem = (newItem) => setItems([...items, newItem]);

  //! UPDATE
  const handleUpdateItem = (updatedItem) => {
    const updatedItems = items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setItems(updatedItems);
  };

  //! DELETE
  const handleDeleteItem = (_id) =>
    setItems(items.filter((item) => item.id !== _id));

  const handleCategoryChange = (category) => setSelectedCategory(category);

  const itemsToDisplay = items.filter((item) => {
    return selectedCategory === "All" || item.category === selectedCategory;
  });

  const allItems = itemsToDisplay.map((item) => (
    <Item
      key={item.id}
      {...item}
      onUpdateItem={handleUpdateItem}
      onDeleteItem={handleDeleteItem}
    />
  ));

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">{allItems}</ul>
    </div>
  );
};

export default ShoppingList;
