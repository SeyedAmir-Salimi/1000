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

  const cardObject = cardImages.filter((x) => x.id === card.cardId)[0];
  const imageFile = require(`../assets/images/${cardObject.image}`);
  const selectedMeld = useSelector((state) => state.gameInfo.selectedMeld);

  // todo => insted of being dependent on the side efect we should be dipendent on the actual event
  // const set = useSelector((state) => state.gameInfo.set);
  useEffect(() => {
    setIsSelected(selectedMeld === card.meldId);
  }, [card.meldId, selectedMeld]);

  const toggleSelection = () => {
    setIsSelected(selectedMeld === card.meldId);
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
