/* eslint-disable react/display-name */
import "./Card.css";

import PropTypes from "prop-types";
import React from "react";

import cardImages from "../assets/cards.json";
import Discard from "./Discard";
import Selection from "./Selection";

const Card = ({ card, index, isDiscarded, isMeld }) => {
  const cardObject = cardImages.filter((x) => x.id === card.cardId)[0];
  const imageFile = require(`../assets/images/${cardObject.image}`);
  let className = `card card${index}`;
  if (isDiscarded) className = `card card${index} user4_discarding`;
  if (isMeld) className = `card card${index} user4_Meld`;
  return (
    <div className={className} style={{ backgroundImage: `url(${imageFile})` }}>
      <Selection cardId={card.id} />
      <Discard cardId={card.id} />
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.object,
  index: PropTypes.number,
  isDiscarded: PropTypes.bool,
  isMeld: PropTypes.bool,
  meld: PropTypes.object,
};

export default React.memo(Card);
