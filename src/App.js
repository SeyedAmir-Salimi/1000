import "./App.css";

import React, { useEffect, useState } from "react";
import { Switch } from "react-router-dom";
import io from "socket.io-client";

import Game from "./components/Game";
import Login from "./components/Login";
import GameMulti from "./components/MultiPlayer/GameMulti";
import MultiPlayer from "./components/MultiPlayer/MultiPlayer";
import WaitToJoin from "./components/MultiPlayer/WaitToJoin";
import WaitToJoinAdmin from "./components/MultiPlayer/WaitToJoinAdmin";

function App() {
  const [setupSocket, setSetupSocket] = useState({});
  const [goToPlay, setGoToPlay] = useState(false);
  const socket = io("http://localhost:3000");
  const gameId = sessionStorage.getItem("Rummy_gameId");

  useEffect(() => {
    socket.on(gameId, (data) => {
      setSetupSocket(data);
      if (data.message === "play") {
        console.log("true");
        setGoToPlay(true);
      }
      // return () => {
      //   socket.disconnect();
      // };
    });
  });

  return (
    <div className="App">
      <Switch>
        <Login exact path="/" component={Login} />
        <MultiPlayer exact path="/multiPlayer" component={MultiPlayer} />
        <WaitToJoinAdmin
          exact
          path="/multiPlayer/admin/:slug"
          component={WaitToJoinAdmin}
          setupSocket={setupSocket}
        />
        <WaitToJoin
          exact
          path="/multiPlayer/:slug"
          component={WaitToJoin}
          goToPlay={goToPlay}
        />
        <GameMulti exact path="/multiPlayer/play/:slug" component={GameMulti} />
        <Game exact path="/:slug" component={Game} />
      </Switch>
    </div>
  );
}

export default App;
