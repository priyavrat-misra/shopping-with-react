import React, { useState } from "react";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    available: 10,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    available: 4,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    available: 6,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    available: 4,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    available: 1,
  },
].map((pizza, index) => {
  return {
    ...pizza,
    id: `${pizza.name.toLowerCase().replace(/\s+/g, "-")}-${index}`,
  };
});

function App() {
  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
}

function Header() {
  return (
    <header>
      <h1>Pizza Stop</h1>
    </header>
  );
}

function Body() {
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

function Menu({ cartItems, onAddItem, onRemoveItem }) {
  const [sortBy, setSortBy] = useState("");
  const sortedPizzas = [...pizzaData];
  if (sortBy === "price-low-high") {
    sortedPizzas.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high-low") {
    sortedPizzas.sort((a, b) => b.price - a.price);
  } else if (sortBy === "avl-low-high") {
    sortedPizzas.sort((a, b) => (a.available ?? 0) - (b.available ?? 0));
  } else if (sortBy === "avl-high-low") {
    sortedPizzas.sort((a, b) => (b.available ?? 0) - (a.available ?? 0));
  }

  return (
    <>
      <h2>Menu</h2>
      <Actions sortBy={sortBy} onSortChange={setSortBy} />
      <ul>
        {sortedPizzas.map((pizza) => (
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

function Actions({ sortBy, onSortChange }) {
  return (
    <section>
      <label>
        Sort by:&nbsp;
        <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          <option value="">--Please choose an option--</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="avl-low-high">Availability: Low to High</option>
          <option value="avl-high-low">Availability: High to Low</option>
        </select>
      </label>
    </section>
  );
}

function Pizza({ pizza, cartItems, onAddItem, onRemoveItem }) {
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

function Cart({ items, onClearCart, onRemoveItem }) {
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

function Address() {
  const [addressState, setAddressState] = useState({
    list: [],
    selectedId: null,
  });

  const { list: addresses, selectedId } = addressState;

  function handleAddAddress(newAddress) {
    const addressWithId = { ...newAddress, id: crypto.randomUUID() };
    setAddressState((prev) => ({
      list: [...prev.list, addressWithId],
      selectedId: addressWithId.id,
    }));
  }

  function handleRemoveAddress(idToRemove) {
    setAddressState((prev) => {
      const nextList = prev.list.filter((addr) => addr.id !== idToRemove);
      return {
        list: nextList,
        selectedId: nextList.length ? nextList[0].id : null,
      };
    });
  }

  return (
    <>
      <h2>Address</h2>
      {addresses.length > 0 && (
        <ChooseAddress
          addresses={addresses}
          selectedId={selectedId}
          onSelect={(id) =>
            setAddressState((prev) => ({ ...prev, selectedId: id }))
          }
          onRemoveAddress={handleRemoveAddress}
        />
      )}
      <AddAddress onAddAddress={handleAddAddress} />
    </>
  );
}

function ChooseAddress({ addresses, selectedId, onSelect, onRemoveAddress }) {
  function handleSubmit(event) {
    event.preventDefault();
    const action = event.nativeEvent.submitter.value;
    if (action === "remove") {
      onRemoveAddress(selectedId);
    } else if (action === "use") {
      console.log(addresses.find((addr) => addr.id === selectedId));
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Choose Address</legend>
        {addresses.map((address) => (
          <React.Fragment key={address.id}>
            <label>
              <input
                type="radio"
                name="address"
                checked={selectedId === address.id}
                onChange={() => onSelect(address.id)}
              />
              {address.name}; {address.address}; {address.phone}
            </label>
            <br />
          </React.Fragment>
        ))}
      </fieldset>
      <button type="submit" value="use">
        Use
      </button>
      <button type="submit" value="remove">
        Remove
      </button>
    </form>
  );
}

function AddAddress({ onAddAddress }) {
  const [addNew, setAddNew] = useState(true);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setAddNew(false);
    setName("");
    setAddress("");
    setPhone("");
    onAddAddress({ name, address, phone }); // Note: values are non-empty as the above setters are async
  }

  return addNew ? (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>New Address</legend>
        <p>
          <label>
            Name:&nbsp;
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            Address:&nbsp;
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            Phone:&nbsp;
            <input
              type="tel"
              required
              placeholder="123-456-7890"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
        </p>
      </fieldset>
      <button type="submit" value="add">
        Add
      </button>
      <button type="button" value="cancel" onClick={() => setAddNew(false)}>
        Cancel
      </button>
    </form>
  ) : (
    <button onClick={() => setAddNew(true)}>Add New</button>
  );
}

function Footer() {
  return React.createElement(
    "footer",
    null,
    <small>&copy; {new Date().getFullYear()}. All rights reserved.</small>,
  );
}

export default App;
