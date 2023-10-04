const Item = ({ id, name, isInCart, category, onUpdateItem, onDeleteItem }) => {
  const handleAddToCartClick = () => {
    fetch(`http://localhost:4000/items/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isInCart: !isInCart }),
    })
      .then((resp) => resp.json())
      .then((updated) => onUpdateItem(updated))
      .catch((err) => console.log(err));
  };

  const handleDeleteClick = () => {
    fetch(`http://localhost:4000/items/${id}`, { method: "DELETE" })
      .then((resp) => resp.json())
      .then(() => onDeleteItem(id))
      .catch((err) => console.log(err));
  };

  return (
    <li className={isInCart ? "in-cart" : ""}>
      <span>{name}</span>
      <span className="category">{category}</span>
      <button
        className={isInCart ? "remove" : "add"}
        onClick={handleAddToCartClick}
      >
        {isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>
        Delete
      </button>
    </li>
  );
};

export default Item;
