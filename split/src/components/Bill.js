import { useState } from "react";

export function Bill({ name, id, onSplit }) {
  const [bill, setBill] = useState(0);
  const [yourPart, setYourPart] = useState(0);
  const theirPart = bill - yourPart;
  const [whosPaying, setWhosPaying] = useState("you");

  function handleSubmit(event) {
    event.preventDefault();
    if (!bill) return;
    onSplit(id, whosPaying === "you" ? theirPart : -yourPart);
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Split a bill with {name}</legend>
        <p>
          <label>
            Bill value:&nbsp;
            <input
              type="number"
              min={0}
              value={bill}
              onChange={(e) => setBill(Number(e.target.value))} />
          </label>
        </p>
        <p>
          <label>
            Your expense:&nbsp;
            <input
              type="number"
              min={0}
              value={yourPart}
              onChange={(e) => {
                const enteredValue = Number(e.target.value);
                setYourPart(enteredValue > bill ? yourPart : enteredValue);
              }} />
          </label>
        </p>
        <p>
          <label>
            {name}'s expense:&nbsp;
            <input type="number" value={theirPart} disabled />
          </label>
        </p>
        <p>
          <label>
            Who's paying?&nbsp;
            <select
              value={whosPaying}
              onChange={(e) => setWhosPaying(e.target.value)}
            >
              <option value="you">You</option>
              <option value="them">{name}</option>
            </select>
          </label>
        </p>
      </fieldset>
      <button type="submit">Split</button>
    </form>
  );
}
