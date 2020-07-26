import "./ReversedCard.css";

import PropTypes from "prop-types";
import React from "react";

function ReversedCard(cardKey) {
  const imageFile = require(`../assets/images/back-0062ff.png`);

  return (
    <div
      key={cardKey}
      className="reversedCard"
      style={{ backgroundImage: `url(${imageFile})` }}
    ></div>
  );
}

ReversedCard.propTypes = {
  cardKey: PropTypes.string,
};

export default ReversedCard;
