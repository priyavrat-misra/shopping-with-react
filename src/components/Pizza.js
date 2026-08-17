import React from "react";

export function Pizza({ pizza, cartItems, onAddItem, onRemoveItem }) {
  const count = cartItems.find((item) => item.id === pizza.id)?.count ?? 0;

  function handleAdd() {
    onAddItem(pizza.id);
  }

  function handleRemove() {
    onRemoveItem(pizza.id);
  }

  return (
    <>
      <h3 style={!pizza.available ? { textDecoration: "line-through" } : null}>
        {pizza.name}
      </h3>
      <p>
        Ingredients: <em>{pizza.ingredients}</em>
      </p>
      <p>{!pizza.available ? "Out of Stock" : `Price: $${pizza.price}`}</p>
      {!!pizza.available && (
        <div>
          <span>Quantity: </span>
          <button onClick={handleRemove} disabled={!count}>
            -
          </button>
          {count}
          <button onClick={handleAdd} disabled={count === pizza.available}>
            +
          </button>
        </div>
      )}
    </>
  );
}
