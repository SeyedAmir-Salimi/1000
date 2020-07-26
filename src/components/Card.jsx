import "./Card.css";

import PropTypes from "prop-types";
import React from "react";
import Draggable from "react-draggable";

import cardImages from "../assets/cards.json";

function Card({ card }) {
  const cardObject = cardImages.filter((x) => x.id === card.cardId)[0];

  const imageFile = require(`../assets/images/${cardObject.image}`);

  return (
    <Draggable key={card.id} bounds="parent">
      <div
        className="box"
        style={{ backgroundImage: `url(${imageFile})` }}
      ></div>
    </Draggable>
  );
}

Card.propTypes = {
  card: PropTypes.object,
};

export default Card;
