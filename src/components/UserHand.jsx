/* eslint-disable react/display-name */
import PropTypes from "prop-types";
import React from "react";

import Card from "./Card";

const UserHand = ({ cards }) => {
  let handCards = [];
  cards.forEach((card) => {
    handCards.push(<Card key={card.id} card={card} />);
  });

  return <>{handCards}</>;
};

UserHand.propTypes = {
  cards: PropTypes.array,
};

export default UserHand;
