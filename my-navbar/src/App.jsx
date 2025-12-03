import { useState } from "react";

export default function App() {
  const [active, setActive] = useState("home");

  return (
    <div>
      <nav
        style={{
          display: "flex",
          gap: "20px",
          background: "#222",
          padding: "12px",
          color: "white"
        }}
      >
        <span
          onClick={() => setActive("home")}
          style={{
            cursor: "pointer",
            padding: "6px 10px",
            borderRadius: 4,
            background: active === "home" ? "#555" : "transparent"
          }}
        >
          Home
        </span>

        <span
          onClick={() => setActive("about")}
          style={{
            cursor: "pointer",
            padding: "6px 10px",
            borderRadius: 4,
            background: active === "about" ? "#555" : "transparent"
          }}
        >
          About
        </span>

        <span
          onClick={() => setActive("contact")}
          style={{
            cursor: "pointer",
            padding: "6px 10px",
            borderRadius: 4,
            background: active === "contact" ? "#555" : "transparent"
          }}
        >
          Contact
        </span>
      </nav>

      <div style={{ padding: 20 }}>
        {active === "home" && <h2>Home Page</h2>}
        {active === "about" && <h2>About Page</h2>}
        {active === "contact" && <h2>Contact Page</h2>}
      </div>
    </div>
  );
}
