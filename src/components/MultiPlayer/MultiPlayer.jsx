import "./MultiPlayer.css";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";

import { createMultiGame } from "../../API/index";
import { createMultiGameCall, getGameRooms } from "../../redux/gameManager";
import SearchToJoin from "./SearchToJoin";

function MultiPlayer() {
  const [searchToJoin, setsearchToJoin] = useState(false);
  let history = useHistory();
  const dispatch = useDispatch();

  const GoToLink = (link) => {
    history.push(link);
  };

  const socket = io("https://rummy-game.netlify.app");
  const gameId = sessionStorage.getItem("Rummy_gameId");
  const username = sessionStorage.getItem("Rummy_multi_name");
  const message = "Join";

  const searchTojoin = () => {
    setsearchToJoin(true);
    dispatch(getGameRooms());
  };

  const creatGame = async () => {
    const result = await createMultiGame(username);
    dispatch(createMultiGameCall(result));
    GoToLink(`/multiPlayer/admin/${sessionStorage.getItem("Rummy_gameId")}`);
    socket.emit("gameInfo", { username, gameId, message });
  };

  return (
    <div className="multi-LoginWrapper">
      <div className="Button-Wrapper">
        <button className="button_Log" onClick={() => creatGame()}>
          Create Game
        </button>
        <button
          className="button_Log"
          onClick={() => {
            searchTojoin();
          }}
        >
          Search to join
        </button>
      </div>
      <SearchToJoin searchToJoin={searchToJoin} />
    </div>
  );
}

export default MultiPlayer;
