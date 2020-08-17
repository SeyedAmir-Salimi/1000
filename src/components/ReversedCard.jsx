/* eslint-disable react/display-name */
import "./ReversedCard.css";

import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

function getBackgroundImage(round) {
  return round % 14;
}

const ReversedCard = React.memo(({ cardKey, user, index, isDiscarded }) => {
  const round = useSelector((state) => state.gameInfo.round);
  const backNumber = getBackgroundImage(round);
  const imageFile = require(`../assets/images/${backNumber}.png`);
  return (
    <div
      key={cardKey}
      className={
        isDiscarded
          ? `reversedCard reversedCard${index} ${user}_discarding`
          : `reversedCard reversedCard${index}`
      }
      style={{ backgroundImage: `url(${imageFile})` }}
    ></div>
  );
});

ReversedCard.propTypes = {
  cardKey: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  index: PropTypes.number,
  isDiscarded: PropTypes.bool,
};

export default ReversedCard;
