import "./Game.css";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createGame, fetchGameInfo, generateHands } from "../API/index";
import DeckCard from "./DeckCard";
import Meld from "./Meld";
import MeldButtun from "./MeldButton";
import OpponentHand from "./OpponentHand";
import Points from "./Points";
import UserHand from "./UserHand";

const Game = () => {
  const dispatch = useDispatch();
  const hand = useSelector((state) => state.gameInfo.hand);
  const topOfTheDeck = useSelector((state) => state.gameInfo.topOfTheDeck);
  const opponents = useSelector((state) => state.gameInfo.opponents);
  const topOfTheMeld = useSelector((state) => state.gameInfo.topOfTheMeld);

  useEffect(() => {
    dispatch(fetchGameInfo());
  }, [dispatch]);

  const createGameCall = () => {
    dispatch(createGame(4));
  };

  const generateHandsCall = () => {
    dispatch(generateHands());
  };

  return (
    <>
      <button onClick={() => createGameCall()}>create game</button>
      <button onClick={() => generateHandsCall()}>generate hands</button>
      <div className="meldButtonWrapper">
        <MeldButtun />
      </div>
      <div className="pointsWrapper">
        <Points />
      </div>

      {opponents && opponents.User1 && (
        <OpponentHand user="User1" count={opponents.User1.cardCount} />
      )}

      {opponents && opponents.User2 && (
        <OpponentHand user="User2" count={opponents.User2.cardCount} />
      )}

      {opponents && opponents.User3 && (
        <OpponentHand user="User3" count={opponents.User3.cardCount} />
      )}

      {topOfTheDeck && <DeckCard key={topOfTheDeck.id} card={topOfTheDeck} />}

      <UserHand cards={hand} />

      {topOfTheMeld && (
        <div className="topOfTheUser4MeldWrapper">
          <Meld key={topOfTheMeld.medlId} card={topOfTheMeld} />
        </div>
      )}

      {opponents && opponents.User1.topOfTheMeld && (
        <div className="topOfTheUser1MeldWrapper">
          <Meld
            key={opponents.User1.topOfTheMeld.medlId}
            card={opponents.User1.topOfTheMeld}
          />
        </div>
      )}

      {opponents && opponents.User2.topOfTheMeld && (
        <div className="topOfTheUser2MeldWrapper">
          <Meld
            key={opponents.User2.topOfTheMeld.medlId}
            card={opponents.User2.topOfTheMeld}
          />
        </div>
      )}

      {opponents && opponents.User3.topOfTheMeld && (
        <div className="topOfTheUser3MeldWrapper">
          <Meld
            key={opponents.User3.topOfTheMeld.medlId}
            card={opponents.User3.topOfTheMeld}
          />
        </div>
      )}
    </>
  );
};

export default Game;
