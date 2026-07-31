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
        {pizzaData.map((pizza, index) => (
          <li key={`pizza#${index}`}>
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
  const [addresses, setAddresses] = useState([]);
  const [addNew, setAddNew] = useState(true);

  function handleAddAddress(newAddress) {
    setAddresses((addresses) => [...addresses, newAddress]);
    setAddNew(!addNew);
  }

  return (
    <>
      <h2>Address</h2>
      {addresses.length > 0 && <ChooseAddress addresses={addresses} />}
      {addNew ? (
        <>
          <AddAddress onAddAddress={handleAddAddress} />
          {addresses.length > 0 && (
            <button onClick={() => setAddNew(!addNew)}>Cancel</button>
          )}
        </>
      ) : (
        <button onClick={() => setAddNew(!addNew)}>Add New</button>
      )}
    </>
  );
}

function ChooseAddress({ addresses }) {
  return (
    <form>
      <fieldset>
        <legend>Choose Address</legend>
        {addresses
          .map(
            (address) =>
              `${address.name}; ${address.address}; ${address.phone}`,
          )
          .map((address, index, addresses) => (
            <React.Fragment key={`address#${index}`}>
              <label>
                <input
                  type="radio"
                  name="address"
                  key={address}
                  value={address}
                  defaultChecked={index === addresses.length - 1}
                />
                {address}
              </label>
              <br />
            </React.Fragment>
          ))}
      </fieldset>
    </form>
  );
}

function AddAddress({ onAddAddress }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  function handleSubmit(event) {
    event.preventDefault(); // prevent page reload
    onAddAddress({ name: name, address: address, phone: phone });
    setName("");
    setAddress("");
    setPhone("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>New Address</legend>
        <p>
          <label>
            Name:&nbsp;
            <input
              type="text"
              required
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            Address:&nbsp;
            <input
              type="text"
              required
              name="address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            Phone:&nbsp;
            <input
              type="tel"
              required
              name="phone"
              placeholder="123-456-7890"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </label>
        </p>
      </fieldset>
      <button>Submit</button>
    </form>
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
