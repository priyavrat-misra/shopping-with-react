import { useState } from "react";

export function AddFriend({ onAddFriend }) {
  const [showAddForm, setShowAddForm] = useState(true);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onAddFriend({ name, avatar, balance: 0, id: crypto.randomUUID() });
    setShowAddForm(false);
    setName("");
    setAvatar("");
  }

  return showAddForm ? (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>New Friend</legend>
        <p>
          <label>
            Name:&nbsp;
            <input
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)} />
          </label>
        </p>
        <p>
          <label>
            Avatar:&nbsp;
            <input
              type="url"
              value={avatar}
              placeholder="https://i.pravatar.cc/48?img=3"
              onChange={(e) => setAvatar(e.target.value)} />
          </label>
        </p>
      </fieldset>
      <button type="submit" value="add">
        Add
      </button>
      <button
        type="button"
        value="cancel"
        onClick={() => setShowAddForm(false)}
      >
        Cancel
      </button>
    </form>
  ) : (
    <button onClick={() => setShowAddForm(true)}>Add Friend</button>
  );
}
