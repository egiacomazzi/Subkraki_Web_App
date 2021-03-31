import React from "react";
import "./CSS/App.css";
import Welcome from "./Welcome.js";
import Calculate from "./Calculate/Calculate.js";
import Impressum from "./shared/Impressum.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/**
 * @author: Elena Giacomazzi, Leon Fruth, Franziska Mäckel
 * @date: 2021-03-30
 */
export default function App() {
  return (
    <Router>
      <div className="App">
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/rechnen">
            <Calculate />
            <Impressum />
          </Route>
          {/* Has to be the last route entered because the url matches from the strat and all of them match with "/" */}
          <Route path="/">
            <Welcome />
            <Impressum />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
