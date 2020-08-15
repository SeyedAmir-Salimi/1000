import PropTypes from "prop-types";
import React, { useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdRadioButtonUnchecked } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux";

import {
  add_selected_card,
  delete_selected_card,
} from "../redux/actions/actions";

function Selection({ cardId }) {
  const [isSelected, setIsSelected] = useState(false);
  const dispatch = useDispatch();

  const toggleSelection = () => {
    setIsSelected(!isSelected);
    if (isSelected) {
      dispatch(delete_selected_card(cardId));
    } else {
      dispatch(add_selected_card(cardId));
    }
  };

  return (
    <>
      {isSelected && (
        <IoMdCheckmarkCircleOutline
          className="Selected_Card"
          onClick={() => toggleSelection()}
          style={{ color: "green", opacity: "100%" }}
        />
      )}
      {!isSelected && (
        <MdRadioButtonUnchecked
          className="Selected_Card"
          onClick={() => toggleSelection()}
          style={{ color: "green", opacity: "100%" }}
        />
      )}
    </>
  );
}

Selection.propTypes = {
  cardId: PropTypes.string,
};

export default Selection;
