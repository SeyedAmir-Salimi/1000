/* eslint-disable react/display-name */
import "./Meld.css";

import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import cardImages from "../assets/cards.json";
import { toggle_selected_meld } from "../redux/actions/actions";
// import MeldSelection from "./MeldSelection";

const Meld = ({ card }) => {
  const [isSelected, setIsSelected] = useState(false);
  const cardObject = cardImages.filter((x) => x.id === card.cardId)[0];
  const imageFile = require(`../assets/images/${cardObject.image}`);
  const selectedMeld = useSelector((state) => state.gameInfo.selectedMeld);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsSelected(selectedMeld === card.meldId);
  }, [card.meldId, selectedMeld]);
  const toggleSelection = () => {
    setIsSelected(selectedMeld === card.meldId);
    dispatch(toggle_selected_meld(card.meldId));
  };
  return (
    <>
      <div
        className="topOfMeld"
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
        {/* <MeldSelection meldId={card.meldId} /> */}
      </div>
    </>
  );
};

Meld.propTypes = {
  card: PropTypes.object,
};

export default Meld;
