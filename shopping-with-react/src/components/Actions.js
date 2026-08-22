import React from "react";

export function Actions({ filters, onFiltersChange }) {
  return (
    <section>
      <label>
        Sort by:&nbsp;
        <select
          value={filters.sortBy}
          onChange={(e) => onFiltersChange("sortBy", e.target.value)}
        >
          <option value="">--Please choose an option--</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="avl-low-high">Availability: Low to High</option>
          <option value="avl-high-low">Availability: High to Low</option>
        </select>
      </label>
      <label>
        <input
          type="checkbox"
          checked={filters.includeOutOfStock}
          onChange={(e) =>
            onFiltersChange("includeOutOfStock", !filters.includeOutOfStock)
          }
        />
        Include Out of Stock
      </label>
    </section>
  );
}
