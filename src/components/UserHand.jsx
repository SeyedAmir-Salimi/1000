/* eslint-disable react/display-name */
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

import Card from "./Card";

const UserHand = ({ cards }) => {
  const action = useSelector((state) => state.uiInfo);
  const isDiscarded = action.user === "User4" && action.type === "discard";
  const isMeld = action.user === "User4" && action.type.slice(0, 4) === "meld";

  let handCards = [];
  let index = 1;
  cards.forEach((card) => {
    handCards.push(
      <Card
        key={card.id}
        card={card}
        index={index}
        isDiscarded={isDiscarded && card.cardId === action.cards}
        isMeld={
          isMeld && action.cards.find((x) => x === card.cardId) ? true : false
        }
        meld={action}
      />
    );
    index++;
  });

  return <>{action.type === "generateHands" ? null : handCards}</>;
};

UserHand.propTypes = {
  cards: PropTypes.array,
};

export default UserHand;
