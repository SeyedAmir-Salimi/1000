import "./Card.css";

import PropTypes from "prop-types";
import React, { useState } from "react";
import Draggable from "react-draggable";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { discard } from "../API/index";
import cardImages from "../assets/cards.json";
import {
  add_meld_proposal,
  delete_meld_proposal,
} from "../redux/actions/actions";

function Card({ card }) {
  const [isSelected, setIsSelected] = useState(false);
  const dispatch = useDispatch();
  const cardObject = cardImages.filter((x) => x.id === card.cardId)[0];
  const imageFile = require(`../assets/images/${cardObject.image}`);

  const toggleSelection = () => {
    setIsSelected(!isSelected);
    if (isSelected) {
      dispatch(delete_meld_proposal(card.id));
    } else {
      dispatch(add_meld_proposal(card.id));
    }
  };

  console.log("cardID", card.cardId);

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

        <h2 className="fire" onClick={() => dispatch(discard(card.id))}>
          🔥
        </h2>
      </div>
    </Draggable>
  );
}

Card.propTypes = {
  card: PropTypes.object,
};

export default Card;
