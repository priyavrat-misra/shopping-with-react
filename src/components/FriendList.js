import { Friend } from "./Friend";

export function FriendList({ friends, selectedId, onSelect }) {
  return (
    <ul style={{ padding: 0 }}>
      {friends.map((f) => (
        <li
          key={f.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "0 16px",
            border: "1px solid lightgray",
          }}
        >
          <Friend friend={f} selectedId={selectedId} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  );
}
