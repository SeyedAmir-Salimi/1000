import "../Game.css";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getGameStateMultiCall } from "../../redux/gameManager";
import AllMelds from "../AllMelds";
import Deck from "../Deck";
import GenerateHandsCards from "../GenerateHandsCards";
import MeldButtun from "../MeldButton";
import OpponentHand from "../OpponentHand";
import Points from "../Points";
import Rules from "../Rules";
import UserHand from "../UserHand";

const Game = () => {
  const [rulesWindow, setRulesWindow] = useState(false);
  const dispatch = useDispatch();
  const hand = useSelector((state) => state.gameInfo.hand);
  const opponents = useSelector((state) => state.gameInfo.opponents);

  useEffect(() => {
    dispatch(getGameStateMultiCall());
    console.log("in");
  }, [dispatch]);

  let history = useHistory();
  const GoToLink = () => {
    history.push("/");
    sessionStorage.removeItem("Rummy_gameId");
  };
  const setRullesToggle = () => {
    setRulesWindow(!rulesWindow);
  };

  const firstOpponent =
    opponents && Object.keys(opponents)[0] ? Object.keys(opponents)[0] : "";
  const firstOpponentCardCount = firstOpponent
    ? opponents[Object.keys(opponents)[0]].cardCount
    : "";

  const secondOpponent =
    opponents && Object.keys(opponents)[1] ? Object.keys(opponents)[1] : "";
  const secondOpponentCardCount = secondOpponent
    ? opponents[Object.keys(opponents)[0]].cardCount
    : "";

  const thirdOpponent =
    opponents && Object.keys(opponents)[2] ? Object.keys(opponents)[2] : "";
  const thirdOpponentCardCount = thirdOpponent
    ? opponents[Object.keys(opponents)[0]].cardCount
    : "";

  return (
    <div>
      {rulesWindow && <Rules toggle={() => setRullesToggle()} />}
      <button className="FinishButton" onClick={() => GoToLink()}>
        Finish the game
      </button>
      <button
        className="HelpButton"
        onClick={() => {
          setRullesToggle();
        }}
      >
        ?
      </button>
      <div className="meldButtonWrapper">
        <MeldButtun />
      </div>
      <div className="board">
        <Points />
        <GenerateHandsCards />
        {opponents && firstOpponent && (
          <OpponentHand user="User1" count={firstOpponentCardCount} />
        )}

        {opponents && secondOpponent && (
          <OpponentHand user="User2" count={secondOpponentCardCount} />
        )}

        {opponents && thirdOpponent && (
          <OpponentHand user="User3" count={thirdOpponentCardCount} />
        )}

        <Deck />

        <UserHand cards={hand} />
        {/* <AllMelds /> */}
      </div>
    </div>
  );
};

export default Game;
