import "../Game.css";

import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function WinnerMulti({ gameWinner }) {
  const [winner, setWinner] = useState("");
  const players = useSelector((state) => state.gameInfo.playerNames);
  const winnerName = winner ? players.find((x) => x.user === winner).name : "";
  const yourUserId = sessionStorage.getItem("Rummy_user");
  useEffect(() => {
    setWinner(gameWinner);
    return () => {
      setWinner("");
    };
  }, [gameWinner]);
  return (
    <div className="Winner_Component">
      {gameWinner && gameWinner === yourUserId && (
        <div className="Winner">
          <h1>You win</h1>
        </div>
      )}
      {gameWinner && gameWinner !== yourUserId && (
        <div className="Loser">
          <h2>Sorry, you lose</h2>
          <h1>{winnerName} is win</h1>
        </div>
      )}
    </div>
  );
}
WinnerMulti.propTypes = {
  gameWinner: PropTypes.string,
};
export default WinnerMulti;
