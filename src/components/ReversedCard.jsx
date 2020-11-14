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
    const action = useSelector((state) => state.uiInfo);
    const backNumber = getBackgroundImage(round);
    const imageFile = require(`../assets/images/${backNumber}.png`);

    let className = `reversedCard reversedCard_${user}_${index}`;

    if (isDiscarded) {
      className = `reversedCard reversedCard_${user}_${index} ${user}_discarding`;
    } else if (isMeld) {
      if (
        meld.type === "meldFromDeck" ||
        meld.type === "meldFromHand" ||
        meld.type === "meldAllofTheDeck" ||
        (meld.type === "meldByOtherUserMeld" && meld.user === user)
      ) {
        className = `reversedCard reversedCard_${user}_${index} ${user}_meld`;
      }
    }

    return (
      <>
        {action.type === "generateHands" ? null : (
          <div
            key={cardKey}
            className={className}
            style={{ backgroundImage: `url(${imageFile})` }}
          ></div>
        )}
      </>
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
