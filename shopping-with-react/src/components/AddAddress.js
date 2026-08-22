import React, { useState } from "react";

export function AddAddress({ onAddAddress }) {
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
