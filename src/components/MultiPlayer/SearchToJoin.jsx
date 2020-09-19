import "./MultiPlayer.css";

import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";

import { joinToMultiGaneCall } from "../../redux/gameManager";

function SearchToJoin({ searchToJoin }) {
  const [selectedRoomId, setselectedRoomId] = useState("");
  const [searchInput, setsearchInput] = useState("");
  const multiInfo = useSelector((state) => state.multiInfo);

  const rooms = multiInfo.gameRooms.map((x) => (
    <div
      key={x.id}
      className="rooms_list_room"
      onClick={() => setselectedRoomId(x.id)}
      style={{ color: selectedRoomId === x.id ? "yellow" : "white" }}
    >
      {/* <h3>{x.id}</h3> */}
      <h3>{x.playerNumbers}</h3>
      <h3>{x.playerNames[0].id}</h3>
    </div>
  ));
  const searchedRoom = multiInfo.gameRooms.find((x) => x.id === searchInput);

  let history = useHistory();
  const dispatch = useDispatch();

  const GoToLink = (link) => {
    history.push(link);
  };
  const username = sessionStorage.getItem("Rummy_multi_name");
  const message = `${username}Join`;
  const gameId = selectedRoomId;
  const room = `${gameId}Join`;

  const socketRef = useRef();
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
  const sendMessage = () => {
    socketRef.current.emit("joinRoom", { username, room, message });
  };
  const joinGame = () => {
    dispatch(joinToMultiGaneCall(gameId, username));
    sendMessage(username, room, message);
    GoToLink(`/multiPlayer/${gameId}`);
  };
  return (
    <div>
      {searchToJoin && (
        <div>
          <form className="room_search_form">
            <input
              type="text"
              placeholder="Search by code"
              value={searchInput}
              onChange={(e) => setsearchInput(e.target.value)}
            />
          </form>
          <div className="rooms_list_titel">
            {/* <h3>Rooms Code</h3> */}
            <h3>Players N.</h3>
            <h3>Created By</h3>
          </div>
          {searchInput.length < 1 ? rooms : ""}

          {searchedRoom && (
            <div
              className="rooms_list_room"
              onClick={() => setselectedRoomId(searchedRoom.id)}
              style={{
                color: selectedRoomId === searchedRoom.id ? "yellow" : "white",
              }}
            >
              {/* <h3>{searchedRoom.id}</h3> */}
              <h3>{searchedRoom.playerNumbers}</h3>
              <h3>{searchedRoom.playerNames[0].id}</h3>
            </div>
          )}

          {selectedRoomId && (
            <div className="Button-Wrapper">
              <button className="button_Log" onClick={() => joinGame()}>
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
