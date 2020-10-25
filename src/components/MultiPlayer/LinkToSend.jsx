import "./MultiPlayer.css";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";

import { joinToMultiGameCall } from "../../redux/gameManager";

function LinkToSend() {
  const [nameInput, setNameInput] = useState("");

  let history = useHistory();
  const dispatch = useDispatch();

  const GoToLink = (link) => {
    history.push(link);
  };
  const gameId = window.location.pathname.split("/multiPlayer/LinkToSend/")[1];
  const socket = io("https://rummyapi.herokuapp.com");
  const name = sessionStorage.getItem("Rummy_multi_name");
  const userId = sessionStorage.getItem("Rummy_UserUniqId");

  const message = "join";
  const data = {
    gameId,
    message,
  };

  const joinGame = (e) => {
    e.preventDefault();
    sessionStorage.setItem("Rummy_multi_name", nameInput);
    dispatch(joinToMultiGameCall(gameId, nameInput));
    socket.emit("join", { name, gameId, userId }, (error) => {
      if (error) {
        alert(error);
      }
    });
    socket.emit("sendMessage", data);
    GoToLink(`/multiPlayer/${gameId}`);
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
