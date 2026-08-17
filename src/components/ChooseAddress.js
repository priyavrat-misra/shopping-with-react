import React from "react";

export function ChooseAddress({
  addresses,
  selectedId,
  onSelect,
  onRemoveAddress,
}) {
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
