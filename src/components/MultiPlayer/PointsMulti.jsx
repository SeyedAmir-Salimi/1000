import "../Points.css";

import React from "react";
import CountUp from "react-countup";
import { useSelector } from "react-redux";

// function usePrevious(value) {
//   const ref = useRef();
//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// }

function Points() {
  const gameInfo = useSelector((state) => state.gameInfo);

  const opponents = useSelector((state) => state.gameInfo.opponents);

  let numbersArrey = [];
  const x1 = opponents ? opponents[Object.keys(opponents)[0]].points : 0;
  const x2 = opponents ? opponents[Object.keys(opponents)[1]].points : 0;
  const x3 = opponents ? opponents[Object.keys(opponents)[2]].points : 0;
  const x4 = gameInfo.yourData ? gameInfo.yourData.points : 0;
  numbersArrey.push(x1, x2, x3, x4);

  let maxNumber = null;
  if (x1 || x2 || x3 || x4 !== 0) maxNumber = Math.max(...numbersArrey);

  const User1 = opponents
    ? opponents[Object.keys(opponents)[0]].name
    : "undefined";
  const User2 = opponents
    ? opponents[Object.keys(opponents)[1]].name
    : "undefined";
  const User3 = opponents
    ? opponents[Object.keys(opponents)[2]].name
    : "undefined";
  const User4 = gameInfo.yourData ? gameInfo.yourData.name : "undefined";

  let user1Points = 0;
  let user2Points = 0;
  let user3Points = 0;
  let user4Points = 0;
  user1Points = opponents ? opponents[Object.keys(opponents)[0]].points : 0;
  // const user1prevPoints = usePrevious(user1Points);
  console.log("user1Points", user1Points);
  user2Points = opponents ? opponents[Object.keys(opponents)[1]].points : 0;
  // const user2prevPoints = usePrevious(user2Points);

  user3Points = opponents ? opponents[Object.keys(opponents)[2]].points : 0;
  // const user3prevPoints = usePrevious(user3Points);

  user4Points = gameInfo.yourData ? gameInfo.yourData.points : 0;
  // const user4prevPoints = usePrevious(user4Points);

  const playerNamesUser1 =
    user1Points === maxNumber
      ? "playerNamesUser1 highestNumber"
      : "playerNamesUser1";
  const playerNamesUser2 =
    user2Points === maxNumber
      ? "playerNamesUser2 highestNumber"
      : "playerNamesUser2";
  const playerNamesUser3 =
    user3Points === maxNumber
      ? "playerNamesUser3 highestNumber"
      : "playerNamesUser3";
  const playerNamesUser4 =
    user4Points === maxNumber
      ? "playerNamesUser4 highestNumber"
      : "playerNamesUser4";

  const countDuration = 2.2;
  return (
    <>
      <h4 className={playerNamesUser1}>
        <CountUp
          start={0}
          end={user1Points ? user1Points : 0}
          duration={countDuration}
          prefix={`${User1}: `}
          separator=" "
        />
      </h4>
      <h4 className={playerNamesUser2}>
        <CountUp
          start={0}
          end={user2Points ? user2Points : 0}
          duration={countDuration}
          prefix={`${User2}: `}
          separator=" "
        />
      </h4>
      <h4 className={playerNamesUser3}>
        <CountUp
          start={0}
          end={user3Points ? user3Points : 0}
          duration={countDuration}
          prefix={`${User3}: `}
          separator=" "
        />
      </h4>
      <h4 className={playerNamesUser4}>
        <CountUp
          start={0}
          end={user4Points ? user4Points : 0}
          duration={countDuration}
          prefix={`${User4}: `}
          separator=" "
        />
      </h4>
    </>
  );
}

export default Points;
