import "./Card.css";

import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { discard } from "../API/index";
import cardImages from "../assets/cards.json";
import {
  add_selected_card,
  delete_selected_card,
} from "../redux/actions/actions";

function Card({ card }) {
  const isMyTurn = useSelector((state) => state.gameInfo.isMyTurn);
  const [isSelected, setIsSelected] = useState(false);
  const dispatch = useDispatch();
  const cardObject = cardImages.filter((x) => x.id === card.cardId)[0];
  const imageFile = require(`../assets/images/${cardObject.image}`);

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
      className="box"
      style={{ backgroundImage: `url(${imageFile})` }}
      onClick={() => toggleSelection()}
    >
      {isSelected && (
        <IoMdCheckmarkCircleOutline
          className="Selected_Card"
          onClick={() => toggleSelection()}
          style={{ color: "green", opacity: "100%" }}
        />
      )}

      {/* {!isSelected && (
        <MdRadioButtonUnchecked
          className="Selected_Card"
          onClick={() => toggleSelection()}
          style={{ color: "red" }}
        />
      )} */}

      {isMyTurn && (
        <h2 className="fire" onClick={() => dispatch(discard(card.id))}>
          🔥
        </h2>
      )}
    </div>
  );
}

Card.propTypes = {
  card: PropTypes.object,
};

export default Card;
