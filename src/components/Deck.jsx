import "./Deckcard.css";

import React from "react";
import { useSelector } from "react-redux";

import DeckCard from "./DeckCard";

export default function Deck() {
  const topOfTheDeck = useSelector((state) => state.gameInfo.topOfTheDeck);

  const action = useSelector((state) => state.uiInfo);
  const secondCard = action.replaceTopofTheDeck;

  let deckclassName = "deckCard";
  if (action.type === "meldFromDeck" || action.type === "meldAllofTheDeck")
    deckclassName = `deckCard ${action.user}_MeldDeck`;

  let replaceClassName = "deckCardReplace";
  if (action.type === "discard" && action.user !== "User4")
    replaceClassName = `deckCardReplace ${action.user}_DeckDiscard`;

  return (
    <>
      {topOfTheDeck && (
        <DeckCard
          key={topOfTheDeck.cardId}
          card={topOfTheDeck}
          className={deckclassName}
        />
      )}

      {action.replaceTopofTheDeck && (
        <DeckCard
          key={secondCard.id}
          card={secondCard}
          className={replaceClassName}
        />
      )}
    </>
  );
}
