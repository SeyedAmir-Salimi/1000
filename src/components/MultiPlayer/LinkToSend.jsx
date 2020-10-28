import "./MultiPlayer.css";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";

import { joinToMultiGame } from "../../API/index";
import { created_multi_game } from "../../redux/actions/actions";

function LinkToSend() {
  const [nameInput, setNameInput] = useState("");

  let history = useHistory();
  const dispatch = useDispatch();

  const GoToLink = (link) => {
    history.push(link);
  };
  const gameId = window.location.pathname.split("/multiPlayer/LinkToSend/")[1];
  const socket = io("https://rummy-game.netlify.app", { transports: ["websocket"] });

  const joinGame = async (e) => {
    // eslint-disable-next-line no-unused-vars
    let newError;
    e.preventDefault();
    const result = await joinToMultiGame(gameId, nameInput);
    sessionStorage.setItem("Rummy_gameId", gameId);
    sessionStorage.setItem("Rummy_UserUniqId", result.yourData.id);
    sessionStorage.setItem("Rummy_user", result.yourData.user);
    sessionStorage.setItem("Rummy_multi_name", result.yourData.name);
    dispatch(created_multi_game(result));
    socket.emit(
      "sendMessage",
      { gameId, message: "join", userId: result.yourData.id },
      (error) => {
        if (error) {
          alert(error);
        }
      }
    );
    GoToLink(`/multiPlayer/${gameId}-${result.yourData.name}`);
  };

  useEffect(() => {
    nameRef.current.focus();
  }, []);
  const nameRef = useRef(null);
  return (
    <div className="wait_join_Wrapper">
      <form className="linkToSend_form" onSubmit={(e) => joinGame(e)}>
        <input
          type="text"
          placeholder="Please write your name"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          ref={nameRef}
        />
      </form>
      {nameInput && (
        <div className="Button-Wrapper">
          <button className="button_Log" onClick={(e) => joinGame(e)}>
            Join to room
          </button>
        </div>
      )}
    </div>
  );
}

export default LinkToSend;
