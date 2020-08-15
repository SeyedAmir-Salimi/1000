import "./Card.css";

import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { discard } from "../API/index";

function Discard({ cardId }) {
  const isMyTurn = useSelector((state) => state.gameInfo.isMyTurn);
  const dispatch = useDispatch();

  return (
    <>
      {isMyTurn && (
        <h2 className="fire" onClick={() => dispatch(discard(cardId))}>
          <>🔥</>
        </h2>
      )}
    </>
  );
}

Discard.propTypes = {
    cardId: PropTypes.string,
};

export default Discard;
