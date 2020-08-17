/* eslint-disable react/display-name */
import "./Card.css";

import PropTypes from "prop-types";
import React from "react";

import cardImages from "../assets/cards.json";
import Discard from "./Discard";
import Selection from "./Selection";

const Card = ({ card, index, isDiscarded }) => {
  const cardObject = cardImages.filter((x) => x.id === card.cardId)[0];
  const imageFile = require(`../assets/images/${cardObject.image}`);
  console.log(isDiscarded);
  return (
    <div
      className={
        isDiscarded ? `card card${index} user4_discarding` : `card card${index}`
      }
      style={{ backgroundImage: `url(${imageFile})` }}
    >
      <Selection cardId={card.id} />
      <Discard cardId={card.id} />
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.object,
  index: PropTypes.number,
  isDiscarded: PropTypes.bool,
};

export default React.memo(Card);
