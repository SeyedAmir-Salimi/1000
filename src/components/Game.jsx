import "./Game.css";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createGame, fetchGameInfo, generateHands } from "../API/index";
import Card from "./Card";
import DeckCard from "./Deckcard";
import MeldButtun from "./MeldButton";
import OpponentHand from "./OpponentHand";

const Game = () => {
  const dispatch = useDispatch();

  const gameId = useSelector((state) => state.gameInfo.gameId);
  const hand = useSelector((state) => state.gameInfo.hand);
  const topOfTheDeck = useSelector((state) => state.gameInfo.topOfTheDeck);
  const opponents = useSelector((state) => state.gameInfo.opponents);

  const handCard = hand.map((card) => <Card key={card.id} card={card} />);

  useEffect(() => {
    dispatch(fetchGameInfo());
  }, [dispatch]);

  const createGameCall = () => {
    dispatch(createGame(4));
  };

  const generateHandsCall = () => {
    dispatch(generateHands(gameId));
  };

  return (
    <>
      <button onClick={() => createGameCall()}>create game</button>
      <button onClick={() => generateHandsCall()}>generate hands</button>
      <MeldButtun />

      <div className="user1Wrapper">
        {opponents && opponents.User1 && (
          <OpponentHand handKey="User1" count={opponents.User1.cardCount} />
        )}
      </div>

      <div className="user2Wrapper">
        {opponents && opponents.User2 && (
          <OpponentHand handKey="User2" count={opponents.User2.cardCount} />
        )}
      </div>

      <div className="user3Wrapper">
        {opponents && opponents.User3 && (
          <OpponentHand handKey="User3" count={opponents.User3.cardCount} />
        )}
      </div>

      <div className="deckWrapper">
        {topOfTheDeck && <DeckCard key={topOfTheDeck.id} card={topOfTheDeck} />}
      </div>
      <div className="user4Wrapper">{handCard}</div>
    </>
  );
};

export default Game;
