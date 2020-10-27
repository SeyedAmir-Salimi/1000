import "./MultiPlayer.css";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";

// import { startToPlayMulti } from "../../API/index";
import { getGameinfoCall, startToPlayMultiCall } from "../../redux/gameManager";
// eslint-disable-next-line no-unused-vars
let newError;
function WaitToJoinAdmin() {
  const [error, setError] = useState("");
  const [startButton, setstartButton] = useState(true);
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

  const socket = io("https://rummyapi.herokuapp.com", { transports: ["websocket"] });
  const gameId = sessionStorage.getItem("Rummy_gameId");
  const name = sessionStorage.getItem("Rummy_multi_name");
  const userId = sessionStorage.getItem("Rummy_UserUniqId");
  useEffect(() => {
    socket.emit("join", { name, gameId, userId }, (error) => {
      if (error) {
        newError = error;
      }
    });
  });

  const disabelButton = () => {
    if (playerLength && playerLength.length === 4) {
      setstartButton(false);
    }
  };

  // const emitPlay = () => {
  //   const message = "play";
  //   socket.emit("sendMessage", { gameId, message }, (error) => {
  //     if (error) {
  //       newError = error;
  //     }
  //   });
  // };

  const startGame = () => {
    if (playerLength && playerLength.length === 4) {
      dispatch(startToPlayMultiCall());
      disabelButton();
    } else {
      setError("The players shoud be 4");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  // const startGame = async () => {
  //   if (playerLength && playerLength.length === 4) {
  //     await startToPlayMulti(gameId);
  //     emitPlay();
  //   } else {
  //     setError("The players shoud be 4");
  //     setTimeout(() => {
  //       setError("");
  //     }, 3000);
  //   }
  // };
  const copyToClipBoard = () => {
    navigator.clipboard.writeText(
      `https://rummy-game.netlify.app/multiPlayer/LinkToSend/${gameId}`
    );
  };

  useEffect(() => {
    socket.on("message", (data) => {
      dispatch(getGameinfoCall());
      if (data.message.message === "play") {
        GoToLink(`/multiPlayer/play/${gameId}`);
        window.location.reload();
      }
    });
    // return () => {
    //   socket.off("message");
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, gameId, socket]);

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
        <button
          className="button_Log"
          onClick={() => startGame()}
          disabled={!startButton}
        >
          Start the game
        </button>
      </div>
      <h5>Send this link to your friend to join</h5>
      <h5>
        {`https://rummy-game.netlify.app/multiPlayer/LinkToSend/${gameId}`}{" "}
        <button className="button_copy" onClick={() => copyToClipBoard()}>
          Click to copy link
        </button>
      </h5>

      <h4>{error}</h4>
    </div>
  );
}

export default WaitToJoinAdmin;
