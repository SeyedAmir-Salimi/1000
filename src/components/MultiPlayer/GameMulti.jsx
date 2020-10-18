import "../Game.css";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";

import {
  getGameStateMultiCall,
  getResultFromSocket,
} from "../../redux/gameManager";
import GenerateHandsCards from "../GenerateHandsCards";
import Rules from "../Rules";
import AllMeldsMulti from "./AllMeldsMulti";
import DeckMulti from "./DeckMulti";
import MeldButtonMulti from "./MeldButtonMulti";
import OpponentHandMulti from "./OpponentHandMulti";
import PointsMulti from "./PointsMulti";
import UserHandMulti from "./UserHandMulti";

const GameMulti = () => {
  const [rulesWindow, setRulesWindow] = useState(false);
  const [socketIo, setSocketIo] = useState("");
  const dispatch = useDispatch();
  const hand = useSelector((state) => state.gameInfo.hand);
  const opponents = useSelector((state) => state.gameInfo.opponents);
  const multiInfo = useSelector((state) => state.multiInfo);
  const playerNames = useSelector((state) => state.gameInfo.playerNames);

  const socket = io("http://localhost:3000", { forceNew: true });
  const gameId = sessionStorage.getItem("Rummy_gameId");
  const userId = sessionStorage.getItem("Rummy_user");
  const gameIdUser = `${gameId}${userId}`;

  const UserTurn =
    multiInfo.turn && playerNames
      ? playerNames.find((x) => x.user === multiInfo.turn).name
      : undefined;

  useEffect(() => {
    socket.on(gameIdUser, (data) => {
      if (data) {
        setSocketIo(data.state);
      }
    });
    return () => {
      socket.off(gameIdUser);
    };
  });

  useEffect(() => {
    dispatch(getResultFromSocket(socketIo));
    return () => {
      setSocketIo("");
    };
  }, [dispatch, socketIo]);

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
    ? opponents[Object.keys(opponents)[1]].cardCount
    : "";

  const thirdOpponent =
    opponents && Object.keys(opponents)[2] ? Object.keys(opponents)[2] : "";
  const thirdOpponentCardCount = thirdOpponent
    ? opponents[Object.keys(opponents)[2]].cardCount
    : "";

  return (
    <div>
      {rulesWindow && <Rules toggle={() => setRullesToggle()} />}
      <button className="FinishButton" onClick={() => GoToLink()}>
        Finish the game
      </button>
      {multiInfo.turn && <h3 className="turn">{`${UserTurn}'s turn`}</h3>}
      <button
        className="HelpButton"
        onClick={() => {
          setRullesToggle();
        }}
      >
        ?
      </button>
      <div className="meldButtonWrapper">
        <MeldButtonMulti />
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
            id={opponents[Object.keys(opponents)[1]].id}
            count={secondOpponentCardCount}
          />
        )}

        {opponents && thirdOpponent && (
          <OpponentHandMulti
            user="User3"
            id={opponents[Object.keys(opponents)[2]].id}
            count={thirdOpponentCardCount}
          />
        )}

        <DeckMulti />

        <UserHandMulti cards={hand} />
        <AllMeldsMulti />
      </div>
    </div>
  );
};

export default GameMulti;
