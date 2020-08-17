/* eslint-disable react/display-name */
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

import ReversedCard from "./ReversedCard";

const OpponentHand = React.memo(({ user, count }) => {
  const action = useSelector((state) => state.uiInfo);

  const isDiscarded = action.user === user && action.type === "discard";
  let cards = [];
  for (let index = 0; index < count; index++) {
    cards.push(
      <ReversedCard
        key={`${user}-${index}`}
        cardKey={`${user}-${index}`}
        user={user}
        index={index + 1}
        isDiscarded={isDiscarded && index === count - 1}
      />
    );
  }

  return <div className={`opponent${user}`}>{cards}</div>;
});

OpponentHand.propTypes = {
  user: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

export default OpponentHand;
