import { useState } from 'react';

export default function TodoManager() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now(), text: input, done: false }]);
      setInput('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleDone = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  const styles = {
    container: {
      minHeight: '100vh',
      padding: '2rem',
      backgroundColor: '#f5f5f5'
    },
    content: {
      maxWidth: '600px',
      margin: '0 auto'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem'
    },
    inputContainer: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '1.5rem'
    },
    input: {
      flex: 1,
      padding: '0.75rem',
      fontSize: '1rem',
      border: '1px solid #ddd',
      borderRadius: '4px'
    },
    addButton: {
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      backgroundColor: '#2563eb',
      color: 'white'
    },
    taskList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    task: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '1rem',
      backgroundColor: 'white',
      borderRadius: '4px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    taskText: (done) => ({
      flex: 1,
      textDecoration: done ? 'line-through' : 'none',
      color: done ? '#999' : '#000'
    }),
    button: {
      padding: '0.5rem 1rem',
      fontSize: '0.875rem',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    doneButton: {
      backgroundColor: '#10b981',
      color: 'white'
    },
    deleteButton: {
      backgroundColor: '#ef4444',
      color: 'white'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>To-Do Manager</h1>
        
        <div style={styles.inputContainer}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            placeholder="Enter a task..."
            style={styles.input}
          />
          <button onClick={addTask} style={styles.addButton}>
            Add
          </button>
        </div>

        <div style={styles.taskList}>
          {tasks.map((task) => (
            <div key={task.id} style={styles.task}>
              <span style={styles.taskText(task.done)}>{task.text}</span>
              <button
                onClick={() => toggleDone(task.id)}
                style={{...styles.button, ...styles.doneButton}}
              >
                {task.done ? 'Undo' : 'Done'}
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                style={{...styles.button, ...styles.deleteButton}}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}