/* eslint-disable react/display-name */
import "./Card.css";

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
import Discard from "./Discard";
// import Selection from "./Selection";

const Card = ({ card, index, isDiscarded, isMeld }) => {
  const [isSelected, setIsSelected] = useState(false);
  const dispatch = useDispatch();

  const cardObject = cardImages.filter((x) => x.id === card.cardId)[0];
  const imageFile = require(`../assets/images/${cardObject.image}`);

  let selectedClass = isSelected ? "SelectedCard" : "";
  let className = `card card${index} ${selectedClass}`;
  if (isDiscarded) className = `card card${index} user4_discarding`;
  if (isMeld) className = `card card${index} user4_Meld`;
  const toggleSelection = () => {
    setIsSelected(!isSelected);
    if (isSelected) {
      dispatch(delete_selected_card(card.id));
    } else {
      dispatch(add_selected_card(card.id));
    }
  };

  return (
    <div
      className={className}
      style={{ backgroundImage: `url(${imageFile})` }}
      onClick={() => toggleSelection()}
    >
      {isSelected && (
        <IoMdCheckmarkCircleOutline
          className="Selected_Card"
          style={{ color: "green", opacity: "100%" }}
        />
      )}
      {!isSelected && (
        <MdRadioButtonUnchecked
          className="Selected_Card"
          style={{ color: "green", opacity: "100%" }}
        />
      )}
      {/* <Selection cardId={card.id} /> */}
      <Discard cardId={card.id} />
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.object,
  index: PropTypes.number,
  isDiscarded: PropTypes.bool,
  isMeld: PropTypes.bool,
  meld: PropTypes.object,
};

export default React.memo(Card);
