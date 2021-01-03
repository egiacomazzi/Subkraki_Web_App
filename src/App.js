import React from 'react';
import './CSS/App.css';
import Speechbubble from './Speechbubble';
import Subkraki from './Subkraki.js';

function App() {
  return (
    <div className="App">
      <Subkraki size="big" />
      <Speechbubble />
    </div>
  );
}

export default App;
