import "../MeldButton.css";

import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { reset_multi_turn } from "../../redux/actions/actions";
import { meldCardsMulti } from "../../redux/gameManager";

export default function MeldButtonMulti() {
  const selectedCards = useSelector((state) => state.gameInfo.selectedCards);
  const selectedMeld = useSelector((state) => state.gameInfo.selectedMeld);

  const userId = sessionStorage.getItem("Rummy_user");
  const multiInfo = useSelector((state) => state.multiInfo.turn);
  const isMyTurn = multiInfo === userId ? true : false;

  const gameInfo = useSelector((state) => state.gameInfo);

  const deckandHandCards = gameInfo.hand.concat(gameInfo.topOfTheDeck);
  const selectedCardValue = [];

  if (gameInfo.selectedCards) {
    gameInfo.selectedCards.forEach((element) => {
      const foundCard = deckandHandCards.find((x) => x.id === element).cardId;
      const splited = foundCard.split("-")[0];
      selectedCardValue.push(splited);
    });
  }
  if (gameInfo.selectedMeld) {
    const splitedMeld = gameInfo.selectedMeld.split("x")[0];
    selectedCardValue.push(splitedMeld);
  }
  const cardsValue = allEqual(selectedCardValue);

  const dispatch = useDispatch();
  return (
    <div>
      {shoudShow(selectedCards, selectedMeld, isMyTurn, cardsValue) && (
        <button
          className="meldButton"
          onClick={() => {
            dispatch(meldCardsMulti(selectedCards, selectedMeld));
            dispatch(reset_multi_turn());
          }}
        >
          meld
        </button>
      )}
    </div>
  );
}

function shoudShow(selectedCards, selectedMeld, isMyTurn, cardsValue) {
  return (
    (selectedCards && selectedCards.length > 1 && isMyTurn && cardsValue) ||
    (selectedCards.length > 0 && selectedMeld && isMyTurn)
  );
}

function allEqual(arr) {
  return new Set(arr).size === 1;
}
