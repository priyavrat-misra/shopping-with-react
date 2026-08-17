import React, { useState } from "react";
import { Cart } from "./Cart";
import { Address } from "./Address";
import { Menu } from "./Menu";

export function Body() {
  const [cartItems, setCartItems] = useState([]);

  function handleAddItem(id) {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, count: item.count + 1 } : item,
        );
      }
      return [...prev, { id, count: 1 }];
    });
  }

  function handleRemoveItem(id) {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (!existing) return prev;
      if (existing.count === 1) {
        return prev.filter((item) => item.id !== id);
      }
      return prev.map((item) =>
        item.id === id ? { ...item, count: item.count - 1 } : item,
      );
    });
  }

  function handleClearCart() {
    if (window.confirm("Are you sure you want to clear the cart?"))
      setCartItems([]);
  }

  return (
    <main>
      <Menu
        cartItems={cartItems}
        onAddItem={handleAddItem}
        onRemoveItem={handleRemoveItem}
      />
      {cartItems.length > 0 && (
        <>
          <Cart
            items={cartItems}
            onClearCart={handleClearCart}
            onRemoveItem={handleRemoveItem}
          />
          <Address />
        </>
      )}
    </main>
  );
}
