/* eslint-disable react/display-name */
import "../ReversedCard.css";

import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

function getBackgroundImage(round) {
  return round % 14;
}

const ReversedCard = ({ cardKey, user, index, isDiscarded, isMeld, meld }) => {
  const round = useSelector((state) => state.gameInfo.round);
  const action = useSelector((state) => state.uiInfo);
  const backNumber = getBackgroundImage(round);
  const imageFile = require(`../../assets/images/${backNumber}.png`);

  let className = `reversedCard reversedCard_${user}_${index}`;
  const max = index;
  // const randomIndex = Math.floor(Math.random() * (max - 1 + 1) + 1);
  if (isDiscarded) {
    // const cardRange = cardRange > 0 && cardRange <= index;
    className = `reversedCard reversedCard_${user}_${max} ${user}_discarding`;
  } else if (isMeld) {
    if (
      meld.type === "meldFromDeck" ||
      meld.type === "meldFromHand" ||
      meld.type === "meldAllofTheDeck" ||
      meld.type === "meldByOtherUserMeld"
    ) {
      className = `reversedCard reversedCard_${user}_${max} ${user}_meld`;
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
};
ReversedCard.propTypes = {
  cardKey: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  index: PropTypes.number,
  isDiscarded: PropTypes.bool,
  isMeld: PropTypes.bool,
  meld: PropTypes.object,
};

export default ReversedCard;
