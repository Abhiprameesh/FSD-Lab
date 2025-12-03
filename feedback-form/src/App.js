import { useState } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);
  const [error, setError] = useState("");

  function submitFeedback() {
    // validation
    if (name.trim() === "" || message.trim() === "" || rating === "") {
      setError("Please fill all fields");
      return;
    }

    if (rating < 1 || rating > 5) {
      setError("Rating must be between 1 and 5");
      return;
    }

    setError("");

    const newFeedback = {
      id: Date.now(),
      name,
      message,
      rating: Number(rating)
    };

    setFeedbackList([...feedbackList, newFeedback]);

    // clear inputs
    setName("");
    setMessage("");
    setRating("");
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Feedback Form</h1>

      <div style={{ marginBottom: 15 }}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: 8, width: 250, marginBottom: 10 }}
        />
        <br />

        <textarea
          placeholder="Your feedback"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ padding: 8, width: 250, height: 80, marginBottom: 10 }}
        />
        <br />

        <input
          type="number"
          placeholder="Rating 1 to 5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          style={{ padding: 8, width: 250, marginBottom: 10 }}
        />
        <br />

        <button
          onClick={submitFeedback}
          style={{ padding: "8px 16px", marginTop: 10 }}
        >
          Submit
        </button>

        {error && (
          <p style={{ color: "red", marginTop: 10 }}>{error}</p>
        )}
      </div>

      <h2>Submitted Feedback</h2>

      {feedbackList.length === 0 && <p>No feedback yet</p>}

      {feedbackList.map((f) => (
        <div
          key={f.id}
          style={{
            background: "#f3f3f3",
            padding: 12,
            borderRadius: 6,
            marginBottom: 10
          }}
        >
          <strong>{f.name}</strong> (Rating: {f.rating})
          <p style={{ margin: 5 }}>{f.message}</p>
        </div>
      ))}
    </div>
  );
}
