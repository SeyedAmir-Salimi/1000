import "./App.css";

import React from "react";
import { Switch } from "react-router-dom";

import Game from "./components/Game";
import Login from "./components/Login";
import GameMulti from "./components/MultiPlayer/GameMulti";
import LinkToSend from "./components/MultiPlayer/LinkToSend";
import MultiPlayer from "./components/MultiPlayer/MultiPlayer";
import WaitToJoin from "./components/MultiPlayer/WaitToJoin";
import WaitToJoinAdmin from "./components/MultiPlayer/WaitToJoinAdmin";

function App() {
  return (
    <div className="App">
      <Switch>
        <Login exact path="/" component={Login} />
        <MultiPlayer exact path="/multiPlayer" component={MultiPlayer} />
        <WaitToJoinAdmin
          exact
          path="/multiPlayer/admin/:slug"
          component={WaitToJoinAdmin}
        />
        <WaitToJoin exact path="/multiPlayer/:slug" component={WaitToJoin} />
        <GameMulti exact path="/multiPlayer/play/:slug" component={GameMulti} />
        <LinkToSend
          exact
          path="/multiPlayer/LinkToSend/:slug"
          component={LinkToSend}
        />
        <Game exact path="/:slug" component={Game} />
      </Switch>
    </div>
  );
}

export default App;
