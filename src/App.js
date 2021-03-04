import React from 'react';
import './CSS/App.css';
import Welcome from './Welcome/Welcome.js';
import Calculate from './Calculate/Calculate.js';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <div className="App">
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/substactionpanel">
            <Calculate />
          </Route>
          {/* Has to be the last route entered because the url matches from the strat and all of them match with "/" */}
          <Route path="/" component={Welcome}></Route>
        </Switch>
      </div>
    </Router>
  );
}
