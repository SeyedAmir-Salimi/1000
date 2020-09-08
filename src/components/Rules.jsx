import "./Rules.css";

import React from "react";

import discard from "../assets/images/discard.jpg";
import meld from "../assets/images/meld.jpg";

function rules() {
  return (
    <div className="rules">
      <span>
        <p>X</p>
      </span>
      <span>
        <h4>OBJECTIVE</h4>
        <h5>Each player tries to 1000 points</h5>
      </span>
      <ul>
        <li>RANK OF CARDS</li>
        <li>A: 20 points</li>
        <li>K,Q,j: 15 points</li>
        <li>10: 10 points</li>
        <li>9,8,7...: 5points</li>
      </ul>
      <span>
        <h4>HOW TO PLAY</h4>
        <h5>
          Each player can make a meld either from the deck or other players
          melds with the cards and to do so should have a card with the same
          value. A card should be discarded if no matching card is available.
        </h5>
      </span>
      <span>
        <h4>Meld</h4>
        <h5>Select two cards with the same value and click on meld buttun</h5>
        <img src={meld} alt="meld"></img>
      </span>
      <span>
        <h4>Discard</h4>
        <h5>Click on the fire on the card to discard it</h5>
        <img src={discard} alt="Discard"></img>
      </span>
    </div>
  );
}

export default rules;
