import { useState, useEffect } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);        
  const [index, setIndex] = useState(-1);        

  // Load from localStorage on first load
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("counter-history"));
    if (saved) {
      setCount(saved.count);
      setHistory(saved.history);
      setIndex(saved.index);
    }
  }, []);

  // Save to localStorage every update
  useEffect(() => {
    localStorage.setItem(
      "counter-history",
      JSON.stringify({ count, history, index })
    );
  }, [count, history, index]);

  function addToHistory(newValue) {
    const newEvent = {
      id: Date.now(),
      prev: count,
      next: newValue,
      time: new Date().toLocaleTimeString()
    };

    // remove future history if user is in middle of undo
    const updated = history.slice(0, index + 1);

    updated.push(newEvent);

    setHistory(updated);
    setIndex(updated.length - 1);
    setCount(newValue);
  }

  function increment() {
    addToHistory(count + 1);
  }

  function decrement() {
    addToHistory(count - 1);
  }

  function reset() {
    addToHistory(0);
  }

  function undo() {
    if (index < 0) return;
    const newIndex = index - 1;
    setIndex(newIndex);
    setCount(newIndex === -1 ? 0 : history[newIndex].next);
  }

  function redo() {
    if (index === history.length - 1) return;
    const newIndex = index + 1;
    setIndex(newIndex);
    setCount(history[newIndex].next);
  }

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>Counter History App</h1>

      <h2>{count}</h2>

      <button onClick={increment}>+</button>
      <button onClick={decrement} style={{ marginLeft: 10 }}>-</button>
      <button onClick={reset} style={{ marginLeft: 10 }}>Reset</button>

      <br /><br />

      <button onClick={undo}>Undo</button>
      <button onClick={redo} style={{ marginLeft: 10 }}>Redo</button>

      <h3>History</h3>
      {history.length === 0 && <p>No history yet</p>}

      {history.map((h, i) => (
        <div
          key={h.id}
          style={{
            padding: "8px 10px",
            background: i === index ? "#dfefff" : "#f6f6f6",
            marginBottom: 5,
            borderRadius: 6
          }}
        >
          <strong>{h.prev} → {h.next}</strong>  
          <div style={{ fontSize: 12 }}>{h.time}</div>
        </div>
      ))}
    </div>
  );
}
