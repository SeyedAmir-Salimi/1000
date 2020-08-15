/* eslint-disable react/display-name */
import "./ReversedCard.css";

import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

function getBackgroundImage(round) {
  return round % 14;
}

const ReversedCard = React.memo(({ cardKey, user }) => {
  const round = useSelector((state) => state.gameInfo.round);
  const action = useSelector((state) => state.uiInfo);
  const handLength = useSelector(
    (state) => state.gameInfo.opponents[user].cardCount
  );

  const isDiscarded =
    action.user === user &&
    action.type === "discard" &&
    cardKey === `${user}-${handLength - 1}`;

  const backNumber = getBackgroundImage(round);
  const imageFile = require(`../assets/images/${backNumber}.png`);
  return (
    <div
      key={cardKey}
      className={
        isDiscarded ? `reversedCard ${user}_discarding` : "reversedCard"
      }
      style={{ backgroundImage: `url(${imageFile})` }}
    ></div>
  );
});

ReversedCard.propTypes = {
  cardKey: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

export default ReversedCard;
