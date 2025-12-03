import { useState } from "react";

export default function App() {
  const items = [
    "Apple",
    "Banana",
    "Orange",
    "Grapes",
    "Pineapple",
    "Mango",
    "Watermelon",
    "Strawberry"
  ];

  const [search, setSearch] = useState("");

  const filtered = items.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Live Search Filter</h1>

      <input
        type="text"
        placeholder="Search a fruit"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: 8, width: 250, marginBottom: 20 }}
      />

      <h3>Results</h3>

      {filtered.length === 0 && <p>No item found</p>}

      <ul>
        {filtered.map((item, index) => (
          <li key={index} style={{ marginBottom: 6 }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
