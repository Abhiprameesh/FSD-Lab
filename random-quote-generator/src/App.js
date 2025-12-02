import React, { useState } from 'react';

export default function QuoteGenerator() {
  const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
    { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela" }
  ];

  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  const generateQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0f0f0',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '600px',
        padding: '40px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '28px',
          marginBottom: '30px',
          color: '#333'
        }}>
          Random Quote Generator
        </h1>

        <div style={{
          padding: '30px',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
          marginBottom: '30px',
          minHeight: '150px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <p style={{
            fontSize: '20px',
            fontStyle: 'italic',
            color: '#555',
            marginBottom: '20px',
            lineHeight: '1.6'
          }}>
            "{currentQuote.text}"
          </p>
          <p style={{
            fontSize: '16px',
            color: '#888',
            fontWeight: 'bold'
          }}>
            - {currentQuote.author}
          </p>
        </div>

        <button
          onClick={generateQuote}
          style={{
            padding: '15px 40px',
            fontSize: '18px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Generate Quote
        </button>
      </div>
    </div>
  );
}