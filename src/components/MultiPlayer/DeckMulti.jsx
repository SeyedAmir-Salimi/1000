import "../Deckcard.css";

import React from "react";
import { useSelector } from "react-redux";

import { foundNewUserIdNew } from "../../redux/gameManager";
import DeckCard from "../DeckCard";

export default function Deck() {
  const topOfTheDeck = useSelector((state) => state.gameInfo.topOfTheDeck);
  const gameInfo = useSelector((state) => state.gameInfo);
  const action = useSelector((state) => state.uiInfo);
  const secondCard = action.replaceTopofTheDeck;

  const rightUser = foundNewUserIdNew(gameInfo, action.userId);

  let deckclassName = "deckCard";
  if (action.type === "meldFromDeck" || action.type === "meldAllofTheDeck")
    deckclassName = `deckCard ${rightUser}_MeldDeck`;

  let replaceClassName = "deckCardReplace";
  if (action.type === "discard" && rightUser !== "User4")
    replaceClassName = `deckCardReplace ${rightUser}_DeckDiscard`;

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
