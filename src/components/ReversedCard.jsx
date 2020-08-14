/* eslint-disable react/display-name */
import "./ReversedCard.css";

import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

function getBackgroundImage(round) {
  return round % 14;
}

const ReversedCard = React.memo(({ cardKey }) => {
  const round = useSelector((state) => state.gameInfo.round);
  const backNumber = getBackgroundImage(round);
  const imageFile = require(`../assets/images/${backNumber}.png`);
  return (
    <div
      key={cardKey}
      className={"reversedCard"}
      style={{ backgroundImage: `url(${imageFile})` }}
    ></div>
  );
});

ReversedCard.propTypes = {
  cardKey: PropTypes.string,
  backNumber: PropTypes.number,
};

export default ReversedCard;
