import "./Meld.css";

import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import cardImages from "../assets/cards.json";
import { toggle_selected_meld } from "../redux/actions/actions";

function Meld({ card }) {
  const [isSelected, setIsSelected] = useState(false);
  const dispatch = useDispatch();

  console.log("meld", card);
  const cardObject = cardImages.filter((x) => x.id === card.cardId)[0];
  const imageFile = require(`../assets/images/${cardObject.image}`);

  const toggleSelection = () => {
    setIsSelected(!isSelected);
    dispatch(toggle_selected_meld(card.meldId));
  };
  return (
    <>
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
    </>
  );
}

Meld.propTypes = {
  card: PropTypes.object,
};

export default Meld;
