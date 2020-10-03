import "../MeldButton.css";

import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { meldCardsMulti } from "../../redux/gameManager";

export default function MeldButtonMulti() {
  const selectedCards = useSelector((state) => state.gameInfo.selectedCards);
  const selectedMeld = useSelector((state) => state.gameInfo.selectedMeld);
  const isMyTurn = useSelector((state) => state.gameInfo.isMyTurn);
  const dispatch = useDispatch();
  return (
    <div>
      {shoudShow(selectedCards, selectedMeld, isMyTurn) && (
        <button
          className="meldButton"
          onClick={() => dispatch(meldCardsMulti(selectedCards, selectedMeld))}
        >
          meld
        </button>
      )}
    </div>
  );
}

function shoudShow(selectedCards, selectedMeld, isMyTurn) {
  return (
    (selectedCards && selectedCards.length > 1 && isMyTurn) ||
    (selectedCards.length > 0 && selectedMeld && isMyTurn)
  );
}
