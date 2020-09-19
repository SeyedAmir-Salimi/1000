import "./MultiPlayer.css";

import React, { useEffect, useRef, useState } from "react";
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
  const username = sessionStorage.getItem("Rummy_multi_name");
  const socketRef = useRef();
  const message = `${username}Creat`;
  // const room = `${gameId}Join`;

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");
    socketRef.current.on("roomUsers", ({ username, room, message }) => {
      console.log(message);
      console.log(room);
      console.log(username);
    });

    // return () => {
    //   socketRef.current.disconnect();
    // };
  });

  const searchTojoin = () => {
    setsearchToJoin(true);
    dispatch(getGameRooms());
  };

  // const creatGame = () => {
  //   dispatch(createMultiGameCall(username));
  //   GoToLink(`/multiPlayer/${gameId}`);
  // };
  const creatGame = async () => {
    const result = await createMultiGame(username);
    dispatch(createMultiGameCall(result));
    const gameId = sessionStorage.getItem("Rummy_gameId");
    GoToLink(`/multiPlayer/${gameId}`);
    const room = `${gameId}Join`;
    socketRef.current.emit("joinRoom", { username, room, message });
  };
  // useEffect(() => {
  //   if (gameId) {
  //     sendMessage(username, room, message);
  //   }
  // }, [gameId]);

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
