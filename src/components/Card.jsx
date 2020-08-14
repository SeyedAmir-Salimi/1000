/* eslint-disable react/display-name */
import "./Card.css";

import PropTypes from "prop-types";
import React, { useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

import { discard } from "../API/index";
import cardImages from "../assets/cards.json";
import {
  add_selected_card,
  delete_selected_card,
} from "../redux/actions/actions";

function areEqual(prevProps, nextProps) {
  console.log(prevProps.cardId === nextProps.cardId);
  return prevProps.cardId === nextProps.cardId;
}

const Card = ({ card }) => {
  console.log("Card", card);
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
      {isMyTurn && (
        <h2 className="fire" onClick={() => dispatch(discard(card.id))}>
          <>🔥</>
        </h2>
      )}
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.object,
};

export default React.memo(Card, areEqual);
