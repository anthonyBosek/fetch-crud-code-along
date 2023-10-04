import { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

const ShoppingList = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((resp) => resp.json())
      .then((items) => setItems(items));
  }, []);

  const handleCategoryChange = (category) => setSelectedCategory(category);

  const itemsToDisplay = items.filter((item) => {
    return selectedCategory === "All" || item.category === selectedCategory;
  });

  const allItems = itemsToDisplay.map((item) => (
    <Item key={item.id} {...item} />
  ));

  return (
    <div className="ShoppingList">
      <ItemForm />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">{allItems}</ul>
    </div>
  );
};

export default ShoppingList;
