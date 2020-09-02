import "./Points.css";

import React from "react";
import { useSelector } from "react-redux";

function Points() {
  const gameInfo = useSelector((state) => state.gameInfo);
  const points = gameInfo.points;
  const playerNames = gameInfo.playerNames;

  let numbersArrey = [];
  const x1 = points.User1;
  const x2 = points.User2;
  const x3 = points.User3;
  const x4 = points.User4;
  numbersArrey.push(x1, x2, x3, x4);

  let maxNumber = null;
  if (x1 || x2 || x3 || x4 !== 0) maxNumber = Math.max(...numbersArrey);

  const User1 = playerNames.length > 1 ? playerNames[0].id : "User1";
  const User2 = playerNames.length > 1 ? playerNames[1].id : "User2";
  const User3 = playerNames.length > 1 ? playerNames[2].id : "User3";
  const User4 = playerNames.length > 1 ? playerNames[3].id : "User4";

  const playerNamesUser1 =
    points.User1 === maxNumber
      ? "playerNamesUser1 highestNumber"
      : "playerNamesUser1";
  const playerNamesUser2 =
    points.User2 === maxNumber
      ? "playerNamesUser2 highestNumber"
      : "playerNamesUser2";
  const playerNamesUser3 =
    points.User3 === maxNumber
      ? "playerNamesUser3 highestNumber"
      : "playerNamesUser3";
  const playerNamesUser4 =
    points.User4 === maxNumber
      ? "playerNamesUser4 highestNumber"
      : "playerNamesUser4";

  return (
    <>
      <h4 className={playerNamesUser1}>
        {User1}:{points.User1 ? points.User1 : 0}
      </h4>
      <h4 className={playerNamesUser2}>
        {User2}:{points.User2 ? points.User2 : 0}
      </h4>
      <h4 className={playerNamesUser3}>
        {User3}:{points.User3 ? points.User3 : 0}
      </h4>
      <h4 className={playerNamesUser4}>
        {User4}:{points.User4 ? points.User4 : 0}
      </h4>
    </>
  );
}

export default Points;
