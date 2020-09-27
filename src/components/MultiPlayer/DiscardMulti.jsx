import "../Card.css";

import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { discardCard } from "../../redux/gameManager";

function DiscardMulti({ cardId }) {
  const isMyTurn = useSelector((state) => state.gameInfo.isMyTurn);
  const dispatch = useDispatch();

  return (
    <>
      {isMyTurn && (
        <h2 className="fire" onClick={() => dispatch(discardCard(cardId))}>
          <>🔥</>
        </h2>
      )}
    </>
  );
}

DiscardMulti.propTypes = {
  cardId: PropTypes.string,
};

export default DiscardMulti;
