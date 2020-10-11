import "../Card.css";

import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { discardCardMulti } from "../../redux/gameManager";

function DiscardMulti({ cardId }) {

  const dispatch = useDispatch();
  const userId = sessionStorage.getItem("Rummy_user");
  const multiInfo = useSelector((state) => state.multiInfo.turn);
  const isMyTurn = multiInfo === userId ? true : false;
  return (
    <>
      {isMyTurn && (
        <h2 className="fire" onClick={() => dispatch(discardCardMulti(cardId))}>
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
