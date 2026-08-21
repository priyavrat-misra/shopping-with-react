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

  function handleSplit(id, balance) {
    setFriends(
      friends.map((friend) =>
        friend.id === id
          ? { ...friend, balance: friend.balance + balance }
          : friend,
      ),
    );
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
            id={selectedId}
            onSplit={handleSplit}
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
    onAddFriend({ name, avatar, balance: 0, id: crypto.randomUUID() });
    setAddFriend(false);
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
  const { name, avatar, balance, id } = friend;
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
          {!balance && `You and ${name} are even.`}
          {balance > 0 && `${name} owes you $${balance}.`}
          {balance < 0 && `You owe ${name} $${-balance}.`}
        </p>
      </div>
      <button onClick={() => onSelect(selectedId === id ? null : id)}>
        {selectedId === id ? "Close" : "Select"}
      </button>
    </>
  );
}

function Bill({ name, id, onSplit }) {
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
              onChange={(e) => setBill(Number(e.target.value))}
            />
          </label>
        </p>
        <p>
          <label>
            Your expense:&nbsp;
            <input
              type="number"
              min={0}
              value={yourPart}
              onChange={(e) =>
                setYourPart(
                  Number(e.target.value > bill ? yourPart : e.target.value),
                )
              }
            />
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

export default App;
