/* eslint-disable react/display-name */
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

import { foundNewUserId } from "../../redux/gameManager";
import ReversedCard from "../ReversedCard";

const OpponentHand = React.memo(({ user, count, id }) => {
  const action = useSelector((state) => state.uiInfo);
  const gameInfo = useSelector((state) => state.gameInfo);

  const rightUser = foundNewUserId(gameInfo, id);

  const isDiscarded = action.user === rightUser && action.type === "discard";
  const isMeld = action.user === rightUser && action.type.slice(0, 4) === "meld";

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
      <div>{cards}</div>
    </>
  );
});

OpponentHand.propTypes = {
  user: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,

};

export default OpponentHand;
