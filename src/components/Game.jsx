import "./Game.css";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createNewGame, getGame, getHands } from "../redux/gameManager";
import AllMelds from "./AllMelds";
import Deck from "./Deck";
import GenerateHandsCards from "./GenerateHandsCards";
import MeldButtun from "./MeldButton";
import OpponentHand from "./OpponentHand";
import Points from "./Points";
import UserHand from "./UserHand";

const Game = () => {
  const dispatch = useDispatch();
  const hand = useSelector((state) => state.gameInfo.hand);
  const opponents = useSelector((state) => state.gameInfo.opponents);

  useEffect(() => {
    dispatch(getGame());
  }, [dispatch]);

  const createGameCall = () => {
    dispatch(createNewGame());
  };

  const generateHandsCall = () => {
    dispatch(getHands());
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
      <GenerateHandsCards />
      {opponents && opponents.User1 && (
        <OpponentHand user="User1" count={opponents.User1.cardCount} />
      )}

      {opponents && opponents.User2 && (
        <OpponentHand user="User2" count={opponents.User2.cardCount} />
      )}

      {opponents && opponents.User3 && (
        <OpponentHand user="User3" count={opponents.User3.cardCount} />
      )}

      <Deck />

      <UserHand cards={hand} />
      <AllMelds />
    </>
  );
};

export default Game;
