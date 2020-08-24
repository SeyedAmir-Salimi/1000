import "./Game.css";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createNewGame, getGame, getHands } from "../redux/gameManager";
import Deck from "./Deck";
import MeldButtun from "./MeldButton";
import OpponentHand from "./OpponentHand";
import Points from "./Points";
import User1Melds from "./User1Melds";
import User2Melds from "./User2Melds";
import User3Melds from "./User3Melds";
import User4Melds from "./User4Melds";
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

  const action = useSelector((state) => state.uiInfo);
  const isMeldFromOther =
    action.type === "meldByOtherUserMeld" && action.user !== action.otherUser;

  const User1MeldClassName =
    isMeldFromOther && action.otherUser === "User1"
      ? `${action.user}MeldFromUser1`
      : "User1_topOfTheMeld";

  const User2MeldClassName =
    isMeldFromOther && action.otherUser === "User2"
      ? `${action.user}MeldFromUser2`
      : "User2_topOfTheMeld";

  const User3MeldClassName =
    isMeldFromOther && action.otherUser === "User3"
      ? `${action.user}MeldFromUser3`
      : "User3_topOfTheMeld";

  const User4MeldClassName =
    isMeldFromOther && action.otherUser === "User4"
      ? `${action.user}MeldFromUser4`
      : "User4_topOfTheMeld";

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

      <Deck />

      <UserHand cards={hand} />

      <User4Melds className={User4MeldClassName} />
      <User1Melds className={User1MeldClassName} />
      <User2Melds className={User2MeldClassName} />
      <User3Melds className={User3MeldClassName} />
    </>
  );
};

export default Game;
