import "./Game.css";

import PropTypes from "prop-types";
import React from "react";

function WinnerSingel({ gameWinner }) {
  return (
    <div className="Winner_Component">
      {gameWinner && gameWinner === "User4" && (
        <div className="Winner">
          <h1>You win</h1>
        </div>
      )}
      {gameWinner && gameWinner !== "User4" && (
        <div className="Loser">
          <h2>Sorry, you lose</h2>
        </div>
      )}
    </div>
  );
}
WinnerSingel.propTypes = {
  gameWinner: PropTypes.string,
};
export default WinnerSingel;
