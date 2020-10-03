import React from "react";
import { useSelector } from "react-redux";

import { foundNewUserIdNew } from "../../redux/gameManager";
import User1MeldsMulti from "./User1MeldsMulti";
import User2MeldsMulti from "./User2MeldsMulti";
import User3MeldsMulti from "./User3MeldsMulti";
import User4MeldsMulti from "./User4MeldsMulti";

function AllMelds() {
  const action = useSelector((state) => state.uiInfo);
  const gameInfo = useSelector((state) => state.gameInfo);

  const newActionUser = foundNewUserIdNew(gameInfo, action.userId);
  const newActionOtherUser = foundNewUserIdNew(gameInfo, action.otherUserId);

  const isMeldFromOther =
    action.type === "meldByOtherUserMeld" &&
    newActionUser !== newActionOtherUser;

  const User1MeldClassName =
    isMeldFromOther && newActionOtherUser === "User1"
      ? `${newActionUser}MeldFromUser1`
      : "User1_topOfTheMeld";

  const User2MeldClassName =
    isMeldFromOther && newActionOtherUser === "User2"
      ? `${newActionUser}MeldFromUser2`
      : "User2_topOfTheMeld";

  const User3MeldClassName =
    isMeldFromOther && newActionOtherUser === "User3"
      ? `${newActionUser}MeldFromUser3`
      : "User3_topOfTheMeld";

  const User4MeldClassName =
    isMeldFromOther && newActionOtherUser === "User4"
      ? `${newActionUser}MeldFromUser4`
      : "User4_topOfTheMeld";
  return (
    <>
      <User4MeldsMulti className={User4MeldClassName} />
      <User1MeldsMulti className={User1MeldClassName} />
      <User2MeldsMulti className={User2MeldClassName} />
      <User3MeldsMulti className={User3MeldClassName} />
    </>
  );
}

export default AllMelds;
