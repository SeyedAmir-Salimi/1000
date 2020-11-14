import "./App.css";

import React from "react";
import { Switch } from "react-router-dom";

import Game from "./components/Game";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Switch>
        <Login exact path="/" component={Login} />
        <Game exact path="/start" component={Game} />
      </Switch>
    </div>
  );
}

export default App;
