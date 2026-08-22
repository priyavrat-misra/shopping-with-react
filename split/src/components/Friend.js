export function Friend({ friend, selectedId, onSelect }) {
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
        }} />
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
