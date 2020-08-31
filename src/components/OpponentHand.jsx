/* eslint-disable react/display-name */
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

import ReversedCard from "./ReversedCard";

const OpponentHand = React.memo(({ user, count }) => {
  const action = useSelector((state) => state.uiInfo);
  const gameInfo = useSelector((state) => state.gameInfo);
  const isDiscarded = action.user === user && action.type === "discard";
  const isMeld = action.user === user && action.type.slice(0, 4) === "meld";

  const User1 =
    gameInfo.playerNames.length > 1 ? gameInfo.playerNames[0].id : "User1";
  const User2 =
    gameInfo.playerNames.length > 1 ? gameInfo.playerNames[1].id : "User2";
  const User3 =
    gameInfo.playerNames.length > 1 ? gameInfo.playerNames[2].id : "User3";

  let CurrentUser = null;
  if (user === "User1") CurrentUser = User1;
  if (user === "User2") CurrentUser = User2;
  if (user === "User3") CurrentUser = User3;

  let cards = [];
  for (let index = 0; index < count; index++) {
    cards.push(
      <ReversedCard
        key={`${user}-${index}`}
        cardKey={`${user}-${index}`}
        user={user}
        index={index + 1}
        isDiscarded={isDiscarded && index === count - 1}
        isMeld={isMeld && index === count - 1}
        meld={action}
      />
    );
  }

  return (
    <>
      <div className={`opponent${user} `}>{cards}</div>
      {/* <div className={`playerNames_${user} `}><h4>{CurrentUser}:{gameInfo.points.User1 ? gameInfo.points.User1 : 0}</h4></div> */}
    </>
  );
});

OpponentHand.propTypes = {
  user: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

export default OpponentHand;
