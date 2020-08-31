import "./Points.css";

import React from "react";
import { useSelector } from "react-redux";

function Points() {
  const gameInfo = useSelector((state) => state.gameInfo);

  const User1 =
    gameInfo.playerNames.length > 1 ? gameInfo.playerNames[0].id : "User1";
  const User2 =
    gameInfo.playerNames.length > 1 ? gameInfo.playerNames[1].id : "User2";
  const User3 =
    gameInfo.playerNames.length > 1 ? gameInfo.playerNames[2].id : "User3";
  const User4 =
    gameInfo.playerNames.length > 1 ? gameInfo.playerNames[3].id : "User4";

  return (
    <>
      <h4>
        {User1}:{gameInfo.points.User1 ? gameInfo.points.User1 : 0}
      </h4>
      <h4>
        {User2}:{gameInfo.points.User2 ? gameInfo.points.User2 : 0}
      </h4>
      <h4>
        {User3}:{gameInfo.points.User3 ? gameInfo.points.User3 : 0}
      </h4>
      <h4>
        {User4}:{gameInfo.points.User4 ? gameInfo.points.User4 : 0}
      </h4>
    </>
  );
}

export default Points;
