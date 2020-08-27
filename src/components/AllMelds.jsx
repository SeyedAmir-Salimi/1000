import React from "react";
import { useSelector } from "react-redux";

import User1Melds from "./User1Melds";
import User2Melds from "./User2Melds";
import User3Melds from "./User3Melds";
import User4Melds from "./User4Melds";

function AllMelds() {
  const action = useSelector((state) => state.uiInfo);

  const isMeldFromOther =
    action.type === "meldByOtherUserMeld" && action.user !== action.otherUser;

  const User1MeldClassName =
    isMeldFromOther && action.otherUser === "User1"
      ? `${action.user}MeldFromUser1`
      : "User1_topOfTheMeld";

  const User2MeldClassName =
    isMeldFromOther && action.otherUser === "User2"
      ? `${action.user}MeldFromUser2`
      : "User2_topOfTheMeld";

  const User3MeldClassName =
    isMeldFromOther && action.otherUser === "User3"
      ? `${action.user}MeldFromUser3`
      : "User3_topOfTheMeld";

  const User4MeldClassName =
    isMeldFromOther && action.otherUser === "User4"
      ? `${action.user}MeldFromUser4`
      : "User4_topOfTheMeld";
  return (
    <>
      <User4Melds className={User4MeldClassName} />
      <User1Melds className={User1MeldClassName} />
      <User2Melds className={User2MeldClassName} />
      <User3Melds className={User3MeldClassName} />
    </>
  );
}

export default AllMelds;
