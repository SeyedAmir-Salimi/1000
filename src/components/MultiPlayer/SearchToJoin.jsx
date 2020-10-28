import "./MultiPlayer.css";

import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";

import { joinToMultiGame } from "../../API/index";
import { created_multi_game } from "../../redux/actions/actions";

function SearchToJoin({ searchToJoin }) {
  const [selectedRoomId, setselectedRoomId] = useState("");
  const multiInfo = useSelector((state) => state.multiInfo);
  const rooms = multiInfo.gameRooms.map((x) => (
    <div
      key={x.id}
      className="rooms_list_room"
      onClick={() => setselectedRoomId(x.id)}
      style={{ color: selectedRoomId === x.id ? "yellow" : "white" }}
    >
      <h3>{x.playerNumbers}</h3>
      <h3>{x.playerNames[0].name}</h3>
    </div>
  ));

  let history = useHistory();
  const dispatch = useDispatch();

  const GoToLink = (link) => {
    history.push(link);
  };
  const username = sessionStorage.getItem("Rummy_multi_name");

  const gameId = selectedRoomId;

  const socket = io("https://rummy-game.netlify.app", { transports: ["websocket"] });

  const joinGame = async (e) => {
    // eslint-disable-next-line no-unused-vars
    let newError;
    e.preventDefault();
    const result = await joinToMultiGame(gameId, username);
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
  return (
    <div>
      {searchToJoin && (
        <div>
          <div className="rooms_list_titel">
            <h3>Players N.</h3>
            <h3>Created By</h3>
          </div>
          {rooms}
          {selectedRoomId && (
            <div className="Button-Wrapper">
              <button className="button_Log" onClick={(e) => joinGame(e)}>
                Join to room
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
SearchToJoin.propTypes = {
  searchToJoin: PropTypes.bool,
};
export default SearchToJoin;
