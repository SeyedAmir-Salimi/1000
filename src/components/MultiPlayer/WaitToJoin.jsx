import "./MultiPlayer.css";

import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";

import { getGameinfoCall } from "../../redux/gameManager";

function WaitToJoin() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGameinfoCall());
  }, [dispatch]);

  let history = useHistory();
  const GoToLink = (link) => {
    history.push(link);
  };
  const gameId = sessionStorage.getItem("Rummy_gameId");
  const socket = io("http://localhost:3000");

  useEffect(() => {
    socket.on(gameId, (data) => {
      if (data.message === "play") {
        GoToLink(`/multiPlayer/play/${gameId}`);
      }
    });
    return () => {
      socket.off(gameId);
    };
  });

  return (
    <div className="wait_join_Wrapper">
      <div>
        <h2>Please wait for Admin to start the game</h2>
      </div>
    </div>
  );
}
WaitToJoin.propTypes = {
  goToPlay: PropTypes.bool,
};
export default WaitToJoin;
