import "./Rules.css";

import PropTypes from "prop-types";
import React from "react";

import discard from "../assets/images/discard.jpg";
import meldDeck from "../assets/images/meld-deck.jpg";
import meldMeld from "../assets/images/meld-meld.jpg";

function rules({ toggle }) {
  return (
    <div className="rules">
      <div className="closeX">
        <p onClick={toggle}>X</p>
      </div>
      <span>
        <h4>OBJECTIVE</h4>
        <h5>Each player tries to 1000 points</h5>
      </span>
      <span>
        <h4>RANK OF CARDS</h4>
        <h5>A: 20 points</h5>
        <h5>K, Q, j: 15 points</h5>
        <h5>10: 10 points</h5>
        <h5>9, 8, 7...: 5 points</h5>
      </span>
      <span>
        <h4>HOW TO PLAY</h4>
        <h5>
          Each player can make a meld either from the deck or other players
          melds with the cards and to do so should have a card with the same
          value. A card should be discarded if no matching card is available.
        </h5>
        <h5>
          Each round has three sets, in the first set of each round if the first
          player makes a meld from the deck, can take all the cards from the
          deck, in other situations he can take just one card.
        </h5>
      </span>
      <span>
        <h4>Meld</h4>
        <h5>Select two cards with the same value and click on meld buttun</h5>
        <h5>
          You cannot make a meld with two or three cards (even with the same
          values) from your hand, they must be 4 cards with the same values
        </h5>
        <img src={meldDeck} alt="meld-deck"></img>
        <img src={meldMeld} alt="meld-meld"></img>
      </span>
      <span className="discard">
        <h4>Discard</h4>
        <h5>Click on the fire on the card to discard it</h5>
        <img src={discard} alt="Discard"></img>
      </span>
    </div>
  );
}
export default rules;

rules.propTypes = {
  toggle: PropTypes.func,
};
