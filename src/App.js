import "./App.css";

import React from "react";
import { Switch } from "react-router-dom";

import Game from "./components/Game";
import Login from "./components/Login";
import MultiPlayer from "./components/MultiPlayer/MultiPlayer";
import WaitToJoin from "./components/MultiPlayer/WaitToJoin";

function App() {
  return (
    <div className="App">
      <Switch>
        <Login exact path="/" component={Login} />
        <MultiPlayer exact path="/multiPlayer" component={MultiPlayer} />
        <WaitToJoin exact path="/multiPlayer/:slug" component={WaitToJoin} />
        <Game exact path="/:slug" component={Game} />
      </Switch>
    </div>
  );
}

export default App;
