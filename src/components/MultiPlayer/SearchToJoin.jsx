import "./MultiPlayer.css";

import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { joinToMultiGameCall } from "../../redux/gameManager";

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
      <h3>{x.playerNumbers}</h3>
      <h3>{x.playerNames[0].name}</h3>
    </div>
  ));
  const searchedRoom = multiInfo.gameRooms.find((x) => x.id === searchInput);

  let history = useHistory();
  const dispatch = useDispatch();

  const GoToLink = (link) => {
    history.push(link);
  };
  const username = sessionStorage.getItem("Rummy_multi_name");

  const gameId = selectedRoomId;

  const joinGame = () => {
    dispatch(joinToMultiGameCall(gameId, username));
    GoToLink(`/multiPlayer/${gameId}`);
  };
  return (
    <div>
      {searchToJoin && (
        <div>
          <form className="room_search_form">
            <input
              type="text"
              placeholder="Search by room code"
              value={searchInput}
              onChange={(e) => setsearchInput(e.target.value)}
            />
          </form>
          <div className="rooms_list_titel">
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
              <h3>{searchedRoom.playerNumbers}</h3>
              <h3>{searchedRoom.playerNames[0].name}</h3>
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
