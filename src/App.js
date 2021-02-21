import React from 'react';
import './CSS/App.css';
import SubtractionPanel from './SubtractionPanel/SubtractionPanel.js';
import Welcome from './Welcome.js';

// function App() {
//   return (
//     <div className="App">
//       <Welcome />
//       <SubtractionPanel subtrahend="777" minuend="456" digits="3" />
//     </div>
//   );
// }

// export default App;

import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link,
} from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <div className="App">
        {/* <ul>
          <li>
            <Link to="/">Nothing</Link>
          </li>
          <li>
            <Link to="/welcome">Welcome</Link>
          </li>
          <li>
            <Link to="/substactionpanel">Math</Link>
          </li>
        </ul> */}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/welcome">
            <Welcome />
          </Route>
          <Route path="/substactionpanel">
            <SubtractionPanel
              subtrahend="777"
              minuend="456"
              digits="3"
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
