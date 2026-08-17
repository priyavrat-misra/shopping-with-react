import React, { useState } from "react";
import { Actions } from "./Actions";
import { Pizza } from "./Pizza";
import { pizzaData } from "../constants/pizzaData";

function processPizzas({ sortBy, includeOutOfStock }) {
  let processedPizzas = [...pizzaData];

  if (!includeOutOfStock)
    processedPizzas = processedPizzas.filter((pizza) => pizza.available);

  if (sortBy === "price-low-high") {
    processedPizzas.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high-low") {
    processedPizzas.sort((a, b) => b.price - a.price);
  } else if (sortBy === "avl-low-high") {
    processedPizzas.sort((a, b) => (a.available ?? 0) - (b.available ?? 0));
  } else if (sortBy === "avl-high-low") {
    processedPizzas.sort((a, b) => (b.available ?? 0) - (a.available ?? 0));
  }

  return processedPizzas;
}
export function Menu({ cartItems, onAddItem, onRemoveItem }) {
  const [filters, setFilters] = useState({
    sortBy: "",
    includeOutOfStock: false,
  });

  const processedPizzas = processPizzas(filters);

  function handleFiltersChange(key, value) {
    setFilters({ ...filters, [key]: value });
  }

  return (
    <>
      <h2>Menu</h2>
      <Actions filters={filters} onFiltersChange={handleFiltersChange} />
      <ul>
        {processedPizzas.map((pizza) => (
          <li key={pizza.id}>
            <Pizza
              pizza={pizza}
              cartItems={cartItems}
              onAddItem={onAddItem}
              onRemoveItem={onRemoveItem}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
