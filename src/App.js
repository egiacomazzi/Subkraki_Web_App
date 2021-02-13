import React from 'react';
import './CSS/App.css';
import Speechbubble from './Speechbubble';
import Subkraki from './Subkraki.js';
import SubtractionPanel from './SubtractionPanel/SubtractionPanel.js'

function App() {
  return (
    <div className="App">
      <Subkraki size="big" />
      <Speechbubble />
      <SubtractionPanel subtrahend="777" minuend="456" digits="3"/>
    </div>
  );
}

export default App;
