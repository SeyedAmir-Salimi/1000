/* eslint-disable react/display-name */
import "./Meld.css";

import PropTypes from "prop-types";
import React from "react";

import cardImages from "../assets/cards.json";
import MeldSelection from "./MeldSelection";

const Meld = ({ card }) => {
  const cardObject = cardImages.filter((x) => x.id === card.cardId)[0];
  const imageFile = require(`../assets/images/${cardObject.image}`);

  return (
    <>
      <div
        className="topOfMeld"
        style={{ backgroundImage: `url(${imageFile})` }}
      >
        <MeldSelection meldId={card.meldId} />
      </div>
    </>
  );
};

Meld.propTypes = {
  card: PropTypes.object,
};

export default Meld;
