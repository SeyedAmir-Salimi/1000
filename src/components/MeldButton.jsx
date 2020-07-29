import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { createMeldFromCards } from "../API/index";

export default function MeldButton() {
  const selectedCards = useSelector((state) => state.gameInfo.selectedCards);
  const selectedMeld = useSelector((state) => state.gameInfo.selectedMeld);
  const dispatch = useDispatch();
  return (
    <div>
      {shoudShow(selectedCards, selectedMeld) && (
        <button
          onClick={() =>
            dispatch(createMeldFromCards(selectedCards, selectedMeld))
          }
        >
          meld
        </button>
      )}
    </div>
  );
}

function shoudShow(selectedCards, selectedMeld) {
  return (
    (selectedCards && selectedCards.length > 1) ||
    (selectedCards.length > 0 && selectedMeld)
  );
}
