/* eslint-disable react/display-name */
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

import { foundNewUserIdNew } from "../../redux/gameManager";
import ReversedCardMulti from "./ReversedCardMulti";

const OpponentHand = ({ user, count }) => {
  const action = useSelector((state) => state.uiInfo);
  const gameInfo = useSelector((state) => state.gameInfo);

  // const rightUser = foundNewUserId(gameInfo, id);

  const rightUser = foundNewUserIdNew(gameInfo, action.userId);

  const isDiscarded = user === rightUser && action.type === "discard";
  const isMeld = user === rightUser && action.type.slice(0, 4) === "meld";

  let cards = [];
  for (let index = 0; index < count; index++) {
    cards.push(
      <ReversedCardMulti
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
      <div>{cards}</div>
    </>
  );
};

OpponentHand.propTypes = {
  user: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

export default OpponentHand;
