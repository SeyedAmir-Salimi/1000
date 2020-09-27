import "./MultiPlayer.css";

import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";

import { getGameinfoCall, startToPlayMultiCall } from "../../redux/gameManager";

function WaitToJoinAdmin({ setupSocket }) {
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGameinfoCall());
  }, [dispatch, setupSocket]);

  const playersState = useSelector((state) => state.multiInfo.createdGame);
  const playerLength = useSelector(
    (state) => state.multiInfo.createdGame.playerNames
  );
  let history = useHistory();
  const GoToLink = (link) => {
    history.push(link);
  };

  const socket = io("http://localhost:3000");
  const gameId = sessionStorage.getItem("Rummy_gameId");
  const username = sessionStorage.getItem("Rummy_multi_name");
  const message = "play";

  useEffect(() => {
    socket.on(gameId, (data) => {
      if (data) {
        dispatch(getGameinfoCall());
      }
    });
  });

  const startGame = () => {
    if (playerLength && playerLength.length === 4) {
      dispatch(startToPlayMultiCall());
      socket.emit("chatMessage", { username, gameId, message });
      GoToLink(`/multiPlayer/play/${gameId}`);
    } else {
      setError("The players shoud be 4");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="wait_join_Wrapper">
      <div>
        <h2>Player Names</h2>
      </div>
      {playersState.id !== undefined
        ? playersState.playerNames.map((x, index) => (
            <div key={index}>
              <h3>{x.name}</h3>
            </div>
          ))
        : ""}
      <div className="Button-Wrapper">
        <button className="button_Log" onClick={() => startGame()}>
          Start the game
        </button>
      </div>
      <h4>{error}</h4>
    </div>
  );
}
WaitToJoinAdmin.propTypes = {
  setupSocket: PropTypes.object,
};
export default WaitToJoinAdmin;
