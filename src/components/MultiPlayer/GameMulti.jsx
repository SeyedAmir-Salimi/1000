import "../Game.css";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getGameStateMultiCall } from "../../redux/gameManager";
import Deck from "../Deck";
import GenerateHandsCards from "../GenerateHandsCards";
import MeldButtun from "../MeldButton";
import Rules from "../Rules";
import UserHandMulti from "./UserHandMulti";
import AllMeldsMulti from "./AllMeldsMulti";
import OpponentHandMulti from "./OpponentHandMulti";
import PointsMulti from "./PointsMulti";

const Game = () => {
  const [rulesWindow, setRulesWindow] = useState(false);
  const dispatch = useDispatch();
  const hand = useSelector((state) => state.gameInfo.hand);
  const opponents = useSelector((state) => state.gameInfo.opponents);
  const gameInfo = useSelector((state) => state.gameInfo);

  useEffect(() => {
    dispatch(getGameStateMultiCall());
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
        <PointsMulti />
        <GenerateHandsCards />
        {opponents && firstOpponent && (
          <OpponentHandMulti
            user="User1"
            id={opponents[Object.keys(opponents)[0]].id}
            count={firstOpponentCardCount}
          />
        )}

        {opponents && secondOpponent && (
          <OpponentHandMulti
            user="User2"
            id={opponents[Object.keys(opponents)[1]]}
            count={secondOpponentCardCount}
          />
        )}

        {opponents && thirdOpponent && (
          <OpponentHandMulti
            user="User3"
            id={opponents[Object.keys(opponents)[2]]}
            count={thirdOpponentCardCount}
          />
        )}

        <Deck />

        <UserHandMulti cards={hand} />
        {/* <AllMelds /> */}
      </div>
    </div>
  );
};

export default Game;
