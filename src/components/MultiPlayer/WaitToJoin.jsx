import "./MultiPlayer.css";

import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";

// import { getGameinfoCall } from "../../redux/gameManager";

function WaitToJoin() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getGameinfoCall());
  // }, [dispatch]);

  let history = useHistory();
  const GoToLink = (link) => {
    history.push(link);
  };
  const gameId = sessionStorage.getItem("Rummy_gameId");
  const socket = io("https://rummyapi.herokuapp.com", { transports: ["websocket"] });
  const name = sessionStorage.getItem("Rummy_multi_name");
  const userId = sessionStorage.getItem("Rummy_UserUniqId");
  console.log("name", name);
  useEffect(() => {
    socket.emit("join", { name, gameId, userId }, (error) => {
      if (error) {
        alert(error);
      }
    });
  });
  useEffect(() => {
    socket.on("message", (data) => {
      if (data.message.message === "play") {
        GoToLink(`/multiPlayer/play/${gameId}`);
        window.location.reload();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="wait_join_Wrapper">
      <div>
        <h2>Please wait for Admin to start the game</h2>
      </div>
    </div>
  );
}

export default WaitToJoin;
