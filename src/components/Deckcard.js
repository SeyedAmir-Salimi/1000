import "./Deckcard.css";

import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import cardImages from "../assets/cards.json";
import thief from "../assets/images/thief.png";
import {
  add_meld_proposal,
  delete_meld_proposal,
} from "../redux/actions/actions";

function Deckcard({ card }) {
  // const [SelectedCardValue, setSelectedCardValue] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const dispatch = useDispatch();

  const cardObject = cardImages.filter((x) => x.id === card.cardId)[0];
  const imageFile = require(`../assets/images/${cardObject.image}`);

  // const selectedCardState = useSelector((state) => state.gameInfo.meldProposals);
  // const selectedTopOfDeck = useSelector((state) => state.gameInfo.topOfTheDeck);
  // const all = [...selectedCardState, selectedTopOfDeck];

  // const allEqual = (arr) => {
  //   return new Set(arr).size == 1;
  // };

  // const isVisible = allEqual(SelectedCardValue);
  // useEffect(() => {
  //   setSelectedCardValue(
  //     all.map((x) => x.cardId.substr(0, x.cardId.indexOf("-")))
  //   );
  // }, [selectedCardState]);

  // const visibility = isVisible ? "flex" : "none";

  const toggleSelection = () => {
    setIsSelected(!isSelected);
    if (isSelected) {
      dispatch(delete_meld_proposal(card.id));
    } else {
      dispatch(add_meld_proposal(card.id));
    }
  };

  return (
    <Draggable key={card.id} bounds="body">
      <div className="box" style={{ backgroundImage: `url(${imageFile})` }}>
        {isSelected ? (
          <IoMdCheckmarkCircleOutline
            className="Selected_Card"
            onClick={() => toggleSelection()}
            style={{ color: "green", opacity: "100%" }}
          />
        ) : (
          <MdRadioButtonUnchecked
            className="Selected_Card"
            onClick={() => toggleSelection()}
            style={{ color: "red" }}
          />
        )}
      </div>
    </Draggable>
  );
}

Deckcard.propTypes = {
  card: PropTypes.object,
};

export default Deckcard;
