import "./Deckcard.css";

import React from "react";
import { useSelector } from "react-redux";

import DeckCard from "./DeckCard";

export default function Deck() {
  const topOfTheDeck = useSelector((state) => state.gameInfo.topOfTheDeck);
  const action = useSelector((state) => state.uiInfo);
  const secondCard = action.replaceTopofTheDeck;

  let className =
    action.type === "meldFromDeck"
      ? `deckCard ${action.user}_MeldDeck`
      : "deckCard";

  return (
    <>
      {topOfTheDeck && (
        <DeckCard
          key={topOfTheDeck.id}
          card={topOfTheDeck}
          className={className}
        />
      )}

      {action.type === "meldFromDeck" && (
        <DeckCard
          key={secondCard.id}
          card={secondCard}
          className="deckCardReplace"
        />
      )}
    </>
  );
}
