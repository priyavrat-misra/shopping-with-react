import { useState } from "react";
import { Bill } from "./components/Bill";
import { FriendList } from "./components/FriendList";
import { AddFriend } from "./components/AddFriend";

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
      friends.map((f) =>
        f.id === id ? { ...f, balance: f.balance + balance } : f,
      ),
    );
    setSelectedId(null);
  }

  const selectedFriend = friends.find((f) => f.id === selectedId);

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
      {selectedFriend && (
        <section style={{ width: "50%", float: "right" }}>
          <Bill
            key={selectedFriend.id}
            id={selectedFriend.id}
            name={selectedFriend.name}
            onSplit={handleSplit}
          />
        </section>
      )}
    </>
  );
}

export default App;
