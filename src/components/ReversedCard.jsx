import "./ReversedCard.css";

import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

function getBackgroundImage(round) {
  return round % 14;
}

function ReversedCard({ cardKey, isDiscarding }) {
  const round = useSelector((state) => state.gameInfo.round);
  const backNumber = getBackgroundImage(round);
  const imageFile = require(`../assets/images/${backNumber}.png`);
  return (
    <div
      key={cardKey}
      className={isDiscarding ? "reversedCard animated" : "reversedCard"}
      style={{ backgroundImage: `url(${imageFile})` }}
    ></div>
  );
}

ReversedCard.propTypes = {
  cardKey: PropTypes.string,
  backNumber: PropTypes.number,
  isDiscarding: PropTypes.bool,
};

export default ReversedCard;
