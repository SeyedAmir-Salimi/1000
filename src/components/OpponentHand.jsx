import PropTypes from "prop-types";
import React from "react";

import ReversedCard from "./ReversedCard";

function OpponentHand({ handKey, count }) {
  let cards = [];
  for (let index = 0; index < count; index++) {
    cards.push(<ReversedCard cardKey={`${handKey}-${index}`} />);
  }
  return <>{cards}</>;
}

OpponentHand.propTypes = {
  handKey: PropTypes.string,
  count: PropTypes.number,
};

export default OpponentHand;
