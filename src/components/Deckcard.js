/* eslint-disable react/display-name */
import "./Deckcard.css";

import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

import cardImages from "../assets/cards.json";
import {
  add_selected_card,
  delete_selected_card,
} from "../redux/actions/actions";

function areEqual(prevProps, nextProps) {
  return prevProps.cardId === nextProps.cardId;
}
const Deckcard = React.memo(({ card }) => {
  const [isSelected, setIsSelected] = useState(false);
  const dispatch = useDispatch();
  const cardObject = cardImages.filter((x) => x.id === card.cardId)[0];
  const imageFile = require(`../assets/images/${cardObject.image}`);

  // todo => insted of being dependent on the side efect we should be dipendent on the actual event
  const set = useSelector((state) => state.gameInfo.set);
  useEffect(() => {
    setIsSelected(false);
  }, [set]);

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
        className="box"
        onClick={() => toggleSelection()}
        style={{ backgroundImage: `url(${imageFile})` }}
      >
        {isSelected && (
          <IoMdCheckmarkCircleOutline
            className="Selected_Card"
            onClick={() => toggleSelection()}
            style={{ color: "green", opacity: "100%" }}
          />
        )}
      </div>
    </>
  );
}, areEqual);

Deckcard.propTypes = {
  card: PropTypes.object,
};

export default Deckcard;
