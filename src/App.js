import { useState } from "react";

function App() {
  const [friends, setFriends] = useState([]);

  function handleAddFriend(friend) {
    setFriends([...friends, friend]);
  }

  return (
    <>
      <header>
        <h1>Split</h1>
      </header>
      {friends.length > 0 && <FriendList friends={friends} />}
      <AddFriend onAddFriend={handleAddFriend} />
    </>
  );
}

function AddFriend({ onAddFriend }) {
  const [addFriend, setAddFriend] = useState(true);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onAddFriend({ name, avatar });
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

function FriendList({ friends }) {
  return (
    <ul>
      {friends.map(({ name, avatar }, index) => (
        <li
          key={index}
          style={{ display: "flex", alignItems: "center", gap: "16px" }}
        >
          <Friend name={name} avatar={avatar} />
        </li>
      ))}
    </ul>
  );
}

function Friend({ name, avatar }) {
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
      <div>
        <p>
          <strong>{name}</strong>
        </p>
      </div>
    </>
  );
}

export default App;
