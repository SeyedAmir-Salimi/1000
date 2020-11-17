/* eslint-disable react/display-name */
import "./Deckcard.css";

import PropTypes from "prop-types";
import React, { useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { useDispatch } from "react-redux";

import cardImages from "../assets/cards.json";
import {
  add_selected_card,
  delete_selected_card,
} from "../redux/actions/actions";
// import Selection from "./Selection";

const DeckCard = ({ card, className }) => {
  const cardObject = cardImages.filter((x) => x.id === card.cardId)[0];
  const imageFile = require(`../assets/images/${cardObject.image}`);

  const [isSelected, setIsSelected] = useState(false);
  const dispatch = useDispatch();

  const toggleSelection = () => {
    setIsSelected(!isSelected);
    if (isSelected) {
      dispatch(delete_selected_card(card.id));
    } else {
      dispatch(add_selected_card(card.id));
    }
  };

  return (
    <>
      <div
        key={card.cardId}
        data-testid={className}
        className={className}
        style={{
          backgroundImage: `url(${imageFile})`,
        }}
        onClick={() => toggleSelection()}
      >
        {isSelected && (
          <IoMdCheckmarkCircleOutline
            className="Selected_Card"
            data-testid="IoMdCheckmarkCircleOutline"
            style={{ color: "green", opacity: "100%" }}
          />
        )}
        {!isSelected && (
          <MdRadioButtonUnchecked
            className="Selected_Card"
            data-testid="MdRadioButtonUnchecked"
            style={{ color: "green", opacity: "100%" }}
          />
        )}
      </div>
    </>
  );
};

DeckCard.propTypes = {
  card: PropTypes.object,
  className: PropTypes.string,
};

export default DeckCard;
