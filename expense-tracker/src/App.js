import React, { useState, useEffect } from 'react';

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState(0);

  // Calculate total whenever expenses change
  useEffect(() => {
    const sum = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    setTotal(sum);
  }, [expenses]);

  const addExpense = () => {
    if (description && amount) {
      const newExpense = {
        id: Date.now(),
        description: description,
        amount: parseFloat(amount)
      };
      setExpenses([...expenses, newExpense]);
      setDescription('');
      setAmount('');
    }
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '32px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          marginBottom: '24px',
          color: '#1f2937'
        }}>
          Expense Tracker
        </h1>

        {/* Total Display */}
        <div style={{
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '14px', marginBottom: '8px' }}>Total Expenses</p>
          <p style={{ fontSize: '32px', fontWeight: 'bold' }}>
            ${total.toFixed(2)}
          </p>
        </div>

        {/* Add Expense Form */}
        <div style={{ marginBottom: '24px' }}>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
          <button
            onClick={addExpense}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Add Expense
          </button>
        </div>

        {/* Expenses List */}
        <div>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '16px',
            color: '#1f2937'
          }}>
            Expenses List
          </h2>
          
          {expenses.length === 0 ? (
            <p style={{ color: '#6b7280', textAlign: 'center', padding: '20px' }}>
              No expenses added yet
            </p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {expenses.map((expense) => (
                <li
                  key={expense.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '4px',
                    marginBottom: '8px'
                  }}
                >
                  <div>
                    <p style={{ fontWeight: 'bold', color: '#1f2937' }}>
                      {expense.description}
                    </p>
                    <p style={{ color: '#3b82f6', fontSize: '18px', marginTop: '4px' }}>
                      ${expense.amount.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteExpense(expense.id)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}