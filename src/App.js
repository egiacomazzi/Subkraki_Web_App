import React from 'react';
import './CSS/App.css';
import SubtractionPanel from './SubtractionPanel/SubtractionPanel.js';
import Welcome from './Welcome.js';

function App() {
  return (
    <div className="App">
      <Welcome />
      <SubtractionPanel subtrahend="777" minuend="456" digits="3" />
    </div>
  );
}

export default App;
