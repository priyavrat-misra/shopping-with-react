import React from "react";

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
      <h2>Menu</h2>
      <h2>Address</h2>
      <h2>Cart</h2>
    </main>
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
