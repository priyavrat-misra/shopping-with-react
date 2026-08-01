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
];

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
  return (
    <main>
      <Menu />
      <Address />
      <h2>Cart</h2>
    </main>
  );
}

function Menu() {
  return (
    <>
      <h2>Menu</h2>
      <ul>
        {pizzaData.map((pizza) => (
          <li key={crypto.randomUUID()}>
            <Pizza pizza={pizza} />
          </li>
        ))}
      </ul>
    </>
  );
}

function Pizza({ pizza }) {
  const [count, setCount] = useState(0);
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
          <button onClick={() => setCount(count - 1)} disabled={!count}>
            -
          </button>
          {count}
          <button
            onClick={() => setCount(count + 1)}
            disabled={count === pizza.available}
          >
            +
          </button>
        </div>
      )}
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
