import "./Game.css";

// import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getGame } from "../redux/gameManager";
import AllMelds from "./AllMelds";
import Deck from "./Deck";
import GenerateHandsCards from "./GenerateHandsCards";
import MeldButtun from "./MeldButton";
import OpponentHand from "./OpponentHand";
import Points from "./Points";
import Rules from "./Rules";
import UserHand from "./UserHand";

const Game = () => {
  const [rulesWindow, setRulesWindow] = useState(false);
  const dispatch = useDispatch();
  const hand = useSelector((state) => state.gameInfo.hand);
  const opponents = useSelector((state) => state.gameInfo.opponents);

  useEffect(() => {
    dispatch(getGame());
  }, [dispatch]);

  let history = useHistory();
  const GoToLink = () => {
    history.push("/");
    sessionStorage.removeItem("Rummy_gameId");
  };

  const setRullesToggle = () => {
    setRulesWindow(!rulesWindow);
  };

  return (
    <div>
      {rulesWindow && <Rules toggle={() => setRullesToggle()} />}
      <div className="board">
        <Points />
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
      </div>
      <button className="FinishButton" onClick={() => GoToLink()}>
        Finish the game
      </button>
      <div className="meldButtonWrapper">
        <MeldButtun />
      </div>
      <button className="HelpButton" onClick={() => setRullesToggle()}>
        ?
      </button>
    </div>
  );
};

export default Game;
