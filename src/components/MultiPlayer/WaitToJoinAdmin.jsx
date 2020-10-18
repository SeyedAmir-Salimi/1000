import "./MultiPlayer.css";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";

import { getGameinfoCall, startToPlayMultiCall } from "../../redux/gameManager";

function WaitToJoinAdmin() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGameinfoCall());
  }, [dispatch]);

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
  // const username = sessionStorage.getItem("Rummy_multi_name");
  // const message = "play";

  useEffect(() => {
    socket.on(gameId, (data) => {
      if (data) {
        dispatch(getGameinfoCall());
      }
      if (data.message === "play") {
        GoToLink(`/multiPlayer/play/${gameId}`);
      }
    });
    return () => {
      socket.off(gameId);
    };
  }, [dispatch]);

  const startGame = () => {
    if (playerLength && playerLength.length === 4) {
      dispatch(startToPlayMultiCall());
      // GoToLink(`/multiPlayer/play/${gameId}`);
    } else {
      setError("The players shoud be 4");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };
  const copyToClipBoard = () => {
    navigator.clipboard.writeText(
      `http://localhost:3001/multiPlayer/LinkToSend/${gameId}`
    );
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
      <h5>Send this link to your friend to join</h5>
      <h5>
        {`http://localhost:3001/multiPlayer/LinkToSend/${gameId}`}{" "}
        <button className="button_copy" onClick={() => copyToClipBoard()}>
          Click to copy link
        </button>
      </h5>
      <h4>{error}</h4>
    </div>
  );
}

export default WaitToJoinAdmin;
