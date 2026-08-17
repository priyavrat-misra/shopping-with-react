import React from "react";
import { pizzaData } from "../constants/pizzaData";

export function Cart({ items, onClearCart, onRemoveItem }) {
  const total = items.reduce(
    (acc, item) =>
      acc + item.count * (pizzaData.find((p) => p.id === item.id)?.price ?? 0),
    0,
  );

  return (
    <>
      <h2>Cart</h2>
      <ul>
        {items.map((item) => {
          const pizza = pizzaData.find((p) => p.id === item.id);
          return (
            <li key={item.id}>
              {pizza.name} &times; {item.count}
              <button onClick={() => onRemoveItem(item.id)}>--</button>
            </li>
          );
        })}
      </ul>
      <p>
        <strong>Total</strong>: ${total}
      </p>
      <button onClick={onClearCart}>Clear Cart</button>
    </>
  );
}
