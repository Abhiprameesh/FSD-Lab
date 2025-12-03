import { useState } from 'react';
import { Search } from 'lucide-react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data - replace with your own
  const items = [
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Elderberry',
    'Fig',
    'Grape',
    'Honeydew',
    'Kiwi',
    'Lemon',
    'Mango',
    'Nectarine',
    'Orange',
    'Papaya',
    'Quince',
    'Raspberry',
    'Strawberry',
    'Tangerine',
    'Watermelon'
  ];
  
  // Filter items based on search term
  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="app">
      <div className="container">
        <div className="card">
          <h1>Live Search Filter</h1>
          
          <div className="search-box">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="results-count">
            {filteredItems.length} {filteredItems.length === 1 ? 'result' : 'results'} found
          </div>
          
          <div className="items-list">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <div key={index} className="item">
                  {item}
                </div>
              ))
            ) : (
              <div className="no-results">
                No items found matching "{searchTerm}"
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;