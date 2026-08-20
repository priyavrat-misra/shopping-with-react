import { useState } from "react";

function App() {
  const [friends, setFriends] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  function handleAddFriend(friend) {
    setFriends([...friends, friend]);
  }

  function handleSelect(id) {
    setSelectedId(id);
  }

  return (
    <>
      <header>
        <h1>Split</h1>
      </header>
      <section style={{ width: "50%", float: "left" }}>
        {friends.length > 0 && (
          <FriendList
            friends={friends}
            selectedId={selectedId}
            onSelect={handleSelect}
          />
        )}
        <AddFriend onAddFriend={handleAddFriend} />
      </section>
      {selectedId && (
        <section style={{ width: "50%", float: "right" }}>
          <Bill
            name={friends.find((friend) => friend.id === selectedId).name}
          />
        </section>
      )}
    </>
  );
}

function AddFriend({ onAddFriend }) {
  const [addFriend, setAddFriend] = useState(true);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onAddFriend({ name, avatar, id: crypto.randomUUID() });
    setName("");
    setAvatar("");
  }

  return addFriend ? (
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
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            Avatar:&nbsp;
            <input
              type="url"
              value={avatar}
              placeholder="https://i.pravatar.cc/48?img=3"
              onChange={(e) => setAvatar(e.target.value)}
            />
          </label>
        </p>
      </fieldset>
      <button type="submit" value="add">
        Add
      </button>
      <button type="button" value="cancel" onClick={() => setAddFriend(false)}>
        Cancel
      </button>
    </form>
  ) : (
    <button onClick={() => setAddFriend(true)}>Add Friend</button>
  );
}

function FriendList({ friends, selectedId, onSelect }) {
  return (
    <ul style={{ padding: 0 }}>
      {friends.map((friend) => (
        <li
          key={friend.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "0 16px",
            border: "1px solid lightgray",
          }}
        >
          <Friend friend={friend} selectedId={selectedId} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  );
}

function Friend({ friend, selectedId, onSelect }) {
  const debt = 0;
  const { name, avatar, id } = friend;
  return (
    <>
      <img
        src={avatar || `https://i.pravatar.cc/48?u=${name}`}
        alt={`${name}'s avatar`}
        style={{
          borderRadius: "50%",
          height: 48,
          width: 48,
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      <div style={{ marginRight: "auto" }}>
        <p>
          <strong>{name}</strong>
        </p>
        <p>
          {!debt && `You and ${name} are even.`}
          {debt > 0 && `${name} owes you $${-debt}.`}
          {debt < 0 && `You owe ${name} $${debt}.`}
        </p>
      </div>
      <button onClick={() => onSelect(selectedId === id ? null : id)}>
        {selectedId === id ? "Close" : "Select"}
      </button>
    </>
  );
}

function Bill({ name }) {
  return (
    <form>
      <fieldset>
        <legend>Split a bill with {name}</legend>
        <p>
          <label>
            Bill value:&nbsp;
            <input type="number" />
          </label>
        </p>
      </fieldset>
    </form>
  );
}

export default App;
