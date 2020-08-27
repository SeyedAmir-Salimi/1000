import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { toggle_selected_meld } from "../redux/actions/actions";

function MeldSelection({ meldId }) {
  const [isSelected, setIsSelected] = useState(false);
  const dispatch = useDispatch();
  const selectedMeld = useSelector((state) => state.gameInfo.selectedMeld);

  useEffect(() => {
    setIsSelected(selectedMeld === meldId);
  }, [meldId, selectedMeld]);

  const toggleSelection = () => {
    setIsSelected(selectedMeld === meldId);
    dispatch(toggle_selected_meld(meldId));
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

MeldSelection.propTypes = {
  meldId: PropTypes.string,
};

export default MeldSelection;
