import React from 'react';
import './CSS/App.css';
import Speechbubble from './Speechbubble';
import Subkraki from './Subkraki.js';
import Arrow from './Arrow.js';
import Number from './Number.js'

function App() {
  return (
    <div className="App">
      <Subkraki size="big" />
      <Speechbubble />
      <Arrow />
      <Number number="1"/>
    </div>
  );
}

export default App;
