/* eslint-disable react/display-name */
import "../Card.css";

import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

import CardMulti from "./CardMulti";

const UserHand = ({ cards }) => {
  const action = useSelector((state) => state.uiInfo);
  const gameInfo = useSelector((state) => state.gameInfo);
  const newUser4 = gameInfo.yourData ? gameInfo.yourData.user : undefined;

  const isDiscarded = action.user === newUser4 && action.type === "discard";
  const isMeld = action.user === newUser4 && action.type.slice(0, 4) === "meld";

  let handCards = [];
  let index = 1;
  cards.forEach((card) => {
    handCards.push(
      <CardMulti
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
