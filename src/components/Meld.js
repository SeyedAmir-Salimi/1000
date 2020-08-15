/* eslint-disable react/display-name */
import "./Meld.css";

import PropTypes from "prop-types";
import React from "react";

import cardImages from "../assets/cards.json";
import MeldSelection from "./MeldSelection";

function areEqual(prevProps, nextProps) {
  return prevProps.cardId === nextProps.cardId;
}
const Meld = React.memo(({ card }) => {
  console.log("Meld");
  const cardObject = cardImages.filter((x) => x.id === card.cardId)[0];
  const imageFile = require(`../assets/images/${cardObject.image}`);

  // todo => insted of being dependent on the side efect we should be dipendent on the actual event
  // const set = useSelector((state) => state.gameInfo.set);

  return (
    <>
      <div className="box" style={{ backgroundImage: `url(${imageFile})` }}>
        <MeldSelection meldId={card.meldId} />
      </div>
    </>
  );
}, areEqual);

Meld.propTypes = {
  card: PropTypes.object,
};

export default Meld;
