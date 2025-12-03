import { useState } from 'react';
import { Plus, Minus, RotateCcw, History, Trash2 } from 'lucide-react';

export default function CounterHistoryApp() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const addToHistory = (action, value, newCount) => {
    const entry = {
      id: Date.now(),
      action,
      value,
      count: newCount,
      timestamp: new Date().toLocaleString()
    };
    setHistory(prev => [entry, ...prev]);
  };

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    addToHistory('increment', '+1', newCount);
  };

  const decrement = () => {
    const newCount = count - 1;
    setCount(newCount);
    addToHistory('decrement', '-1', newCount);
  };

  const reset = () => {
    setCount(0);
    addToHistory('reset', '0', 0);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'increment':
        return 'text-green-600';
      case 'decrement':
        return 'text-red-600';
      case 'reset':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'increment':
        return '+';
      case 'decrement':
        return '-';
      case 'reset':
        return '↺';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Counter History App
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Counter Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">
              Counter
            </h2>
            
            <div className="text-center mb-8">
              <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                {count}
              </div>
              <div className="text-sm text-gray-500 mt-2">
                Current Value
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={increment}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-lg transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <Plus size={20} />
                Increment
              </button>

              <button
                onClick={decrement}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-lg transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <Minus size={20} />
                Decrement
              </button>

              <button
                onClick={reset}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <RotateCcw size={20} />
                Reset
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="w-full bg-purple-100 hover:bg-purple-200 text-purple-700 font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
              >
                <History size={20} />
                {showHistory ? 'Hide' : 'Show'} History ({history.length})
              </button>
            </div>
          </div>

          {/* History Section */}
          <div className={`bg-white rounded-xl shadow-lg p-8 ${showHistory ? '' : 'opacity-50'}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-700">
                History
              </h2>
              {history.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1 transition"
                >
                  <Trash2 size={16} />
                  Clear All
                </button>
              )}
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {history.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <History size={48} className="mx-auto mb-3 opacity-30" />
                  <p>No history yet</p>
                  <p className="text-sm mt-1">Start using the counter!</p>
                </div>
              ) : (
                history.map((entry) => (
                  <div
                    key={entry.id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-purple-300 transition"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-bold text-lg ${getActionColor(entry.action)}`}>
                        {getActionIcon(entry.action)} {entry.action}
                      </span>
                      <span className="text-2xl font-bold text-gray-700">
                        {entry.count}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {entry.timestamp}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Statistics */}
        {history.length > 0 && (
          <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Statistics</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {history.filter(h => h.action === 'increment').length}
                </div>
                <div className="text-sm text-gray-600">Increments</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {history.filter(h => h.action === 'decrement').length}
                </div>
                <div className="text-sm text-gray-600">Decrements</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {history.filter(h => h.action === 'reset').length}
                </div>
                <div className="text-sm text-gray-600">Resets</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}