/* eslint-disable react/display-name */
import "./Deckcard.css";

import PropTypes from "prop-types";
import React from "react";

import cardImages from "../assets/cards.json";
import Selection from "./Selection";

const Deckcard = ({ card, className }) => {
  const cardObject = cardImages.filter((x) => x.id === card.cardId)[0];
  const imageFile = require(`../assets/images/${cardObject.image}`);
  return (
    <>
      <div
        key={card.cardId}
        className={className}
        style={{ backgroundImage: `url(${imageFile})` }}
      >
        <Selection cardId={card.id} />
      </div>
    </>
  );
};

Deckcard.propTypes = {
  card: PropTypes.object,
  className: PropTypes.string,
};

export default Deckcard;
