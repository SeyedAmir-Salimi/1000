import "./Points.css";

import React, { useEffect, useRef } from "react";
import CountUp from "react-countup";
import { useSelector } from "react-redux";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

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

  const user1Points = points.User1 ? points.User1 : 0;
  const user1prevPoints = usePrevious(user1Points);

  const user2Points = points.User2 ? points.User2 : 0;
  const user2prevPoints = usePrevious(user2Points);

  const user3Points = points.User3 ? points.User3 : 0;
  const user3prevPoints = usePrevious(user3Points);

  const user4Points = points.User4 ? points.User4 : 0;
  const user4prevPoints = usePrevious(user4Points);
  const countDuration = 2.2;
  console.log("user4prevPoints", user4prevPoints);
  console.log("user4Points", user4Points);
  return (
    <>
      <h4 className={playerNamesUser1}>
        <CountUp
          start={user1prevPoints}
          end={user1Points}
          duration={countDuration}
          prefix={`${User1}: `}
          separator=" "
        />
      </h4>
      <h4 className={playerNamesUser2}>
        <CountUp
          start={user2prevPoints}
          end={user2Points}
          duration={countDuration}
          prefix={`${User2}: `}
          separator=" "
        />
      </h4>
      <h4 className={playerNamesUser3}>
        <CountUp
          start={user3prevPoints}
          end={user3Points}
          duration={countDuration}
          prefix={`${User3}: `}
          separator=" "
        />
      </h4>
      <h4 className={playerNamesUser4}>
        <CountUp
          start={user4prevPoints}
          end={user4Points}
          duration={countDuration}
          prefix={`${User4}: `}
          separator=" "
        />
      </h4>
    </>
  );
}

export default Points;
