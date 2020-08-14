/* eslint-disable react/display-name */
import PropTypes from "prop-types";
import React from "react";

import ReversedCard from "./ReversedCard";

const OpponentHand = React.memo(({ user, count }) => {
  let cards = [];
  for (let index = 0; index < count; index++) {
    cards.push(
      <ReversedCard key={`${user}-${index}`} cardKey={`${user}-${index}`} />
    );
  }
  return <>{cards}</>;
});

OpponentHand.propTypes = {
  user: PropTypes.string,
  count: PropTypes.number,
};

export default OpponentHand;
