/* eslint-disable react/display-name */
import "./Deckcard.css";

import PropTypes from "prop-types";
import React from "react";

import cardImages from "../assets/cards.json";
import Selection from "./Selection";

function areEqual(prevProps, nextProps) {
  return prevProps.cardId === nextProps.cardId;
}
const Deckcard = React.memo(({ card }) => {
  const cardObject = cardImages.filter((x) => x.id === card.cardId)[0];
  const imageFile = require(`../assets/images/${cardObject.image}`);

  return (
    <>
      <div className="box" style={{ backgroundImage: `url(${imageFile})` }}>
        <Selection cardId={card.id} />
      </div>
    </>
  );
}, areEqual);

Deckcard.propTypes = {
  card: PropTypes.object,
};

export default Deckcard;
