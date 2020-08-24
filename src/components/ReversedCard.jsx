/* eslint-disable react/display-name */
import "./ReversedCard.css";

import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

function getBackgroundImage(round) {
  return round % 14;
}

const ReversedCard = React.memo(
  ({ cardKey, user, index, isDiscarded, isMeld, meld }) => {
    const round = useSelector((state) => state.gameInfo.round);
    const backNumber = getBackgroundImage(round);
    const imageFile = require(`../assets/images/${backNumber}.png`);

    let className = `reversedCard reversedCard${index}`;

    if (isDiscarded) {
      className = `reversedCard reversedCard${index} ${user}_discarding`;
    } else if (isMeld) {
      if (
        meld.type === "meldFromDeck" ||
        meld.type === "meldFromHand" ||
        (meld.type === "meldByOtherUserMeld" && meld.user === user)
      ) {
        className = `reversedCard reversedCard${index} ${user}_meld`;
      }
    }

    return (
      <div
        key={cardKey}
        className={className}
        style={{ backgroundImage: `url(${imageFile})` }}
      ></div>
    );
  }
);

ReversedCard.propTypes = {
  cardKey: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  index: PropTypes.number,
  isDiscarded: PropTypes.bool,
  isMeld: PropTypes.bool,
  meld: PropTypes.object,
};

export default ReversedCard;
