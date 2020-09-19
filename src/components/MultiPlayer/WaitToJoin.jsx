import "./MultiPlayer.css";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getGameinfoCall } from "../../redux/gameManager";

function WaitToJoin() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGameinfoCall());
  }, [dispatch]);

  const playersState = useSelector((state) => state.multiInfo.createdGame);
  if (playersState.playerNames.length > 1) console.log("yes");
  return (
    <div className="wait_join_Wrapper">
      <div>
        <h2>Player Names</h2>
      </div>
      {playersState.id !== undefined
        ? playersState.playerNames.map((x, index) => (
            <div key={index}>
              <h3>{x.id}</h3>
            </div>
          ))
        : ""}
    </div>
  );
}

export default WaitToJoin;
