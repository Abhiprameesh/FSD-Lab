import { useState, useEffect } from "react";

export default function App() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  // Load saved data when app starts
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("expenses"));
    if (saved) {
      setExpenses(saved);
    }
  }, []);

  // Save expenses to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Add new expense
  function addExpense() {
    if (title.trim() === "" || amount === "" || Number(amount) <= 0) {
      alert("Enter valid title and amount");
      return;
    }

    const newExpense = {
      id: Date.now(),
      title: title.trim(),
      amount: Number(amount)
    };

    setExpenses([...expenses, newExpense]);
    setTitle("");
    setAmount("");
  }

  // Delete expense
  function deleteExpense(id) {
    setExpenses(expenses.filter((e) => e.id !== id));
  }

  // Calculate total
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Expense Tracker</h1>

      {/* Input Form */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Expense title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: 8, marginRight: 10 }}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ padding: 8, marginRight: 10 }}
        />

        <button onClick={addExpense} style={{ padding: "8px 16px" }}>
          Add
        </button>
      </div>

      {/* List */}
      <h3>Expenses</h3>
      {expenses.length === 0 && <p>No expenses added</p>}

      {expenses.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 10,
            background: "#f3f3f3",
            marginBottom: 8,
            borderRadius: 6
          }}
        >
          <span>{item.title} - ₹{item.amount}</span>

          <button
            onClick={() => deleteExpense(item.id)}
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "6px 10px",
              borderRadius: 4
            }}
          >
            Delete
          </button>
        </div>
      ))}

      {/* Total */}
      <h2>Total Spent: ₹{total}</h2>
    </div>
  );
}
