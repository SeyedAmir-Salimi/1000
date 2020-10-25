import "../Game.css";

import React, { useEffect, useState } from "react";
import { AiFillWechat } from "react-icons/ai";
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
import Chat from "./Chat";
import DeckMulti from "./DeckMulti";
import MeldButtonMulti from "./MeldButtonMulti";
import OpponentHandMulti from "./OpponentHandMulti";
import PointsMulti from "./PointsMulti";
import UserHandMulti from "./UserHandMulti";
import WinnerMulti from "./WinnerMulti";

const GameMulti = () => {
  const [rulesWindow, setRulesWindow] = useState(false);
  const [socketIo, setSocketIo] = useState("");
  const [chatDisplay, setChatDisplay] = useState(true);
  const dispatch = useDispatch();
  const hand = useSelector((state) => state.gameInfo.hand);
  const opponents = useSelector((state) => state.gameInfo.opponents);
  const multiInfo = useSelector((state) => state.multiInfo);
  const playerNames = useSelector((state) => state.gameInfo.playerNames);
  const gameWinner = useSelector((state) => state.gameInfo.winner);
  const action = useSelector((state) => state.uiInfo);
  const socket = io("https://rummyapi.herokuapp.com", { forceNew: true });
  const gameId = sessionStorage.getItem("Rummy_gameId");
  const userId = sessionStorage.getItem("Rummy_user");
  // const gameIdUser = `${gameId}${userId}`;
  // useEffect(() => {
  //   socket.on(gameIdUser, (data) => {
  //     if (data) {
  //       setSocketIo(data.state);
  //     }
  //   });
  //   return () => {
  //     socket.off(gameIdUser);
  //   };
  // });
  useEffect(() => {
    socket.on(`${userId}`, (data) => {
      // console.log("userId", data);
      setSocketIo(data.state);
    });
    // return () => {
    //   socket.off("message");
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const name = sessionStorage.getItem("Rummy_multi_name");
  useEffect(() => {
    socket.emit("join", { name, gameId, userId }, (error) => {
      if (error) {
        alert(error);
      }
    });
    return () => {
      socket.off("join");
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

  const UserTurn =
    multiInfo.turn && playerNames.length > 0
      ? playerNames.find((x) => x.user === multiInfo.turn).name
      : undefined;

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
      {gameWinner && <WinnerMulti gameWinner={gameWinner} />}

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
      <button
        className="ChatButton"
        onClick={() => setChatDisplay(!chatDisplay)}
      >
        <AiFillWechat />
      </button>
      <div className="meldButtonWrapper">
        <MeldButtonMulti />
      </div>
      <div className="board">
        <PointsMulti />
        <GenerateHandsCards />
        {opponents && firstOpponent && action.type !== "generateHands" && (
          <OpponentHandMulti
            user="User1"
            id={opponents[Object.keys(opponents)[0]].id}
            count={firstOpponentCardCount}
          />
        )}

        {opponents && secondOpponent && action.type !== "generateHands" && (
          <OpponentHandMulti
            user="User2"
            id={opponents[Object.keys(opponents)[1]].id}
            count={secondOpponentCardCount}
          />
        )}

        {opponents && thirdOpponent && action.type !== "generateHands" && (
          <OpponentHandMulti
            user="User3"
            id={opponents[Object.keys(opponents)[2]].id}
            count={thirdOpponentCardCount}
          />
        )}
        {action.type !== "generateHands" && <DeckMulti />}

        <UserHandMulti cards={hand} />
        <AllMeldsMulti />
      </div>
      <Chat chatDisplay={chatDisplay} />
    </div>
  );
};

export default GameMulti;
