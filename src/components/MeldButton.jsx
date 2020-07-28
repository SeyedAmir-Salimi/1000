import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { createMeldFromCards } from "../API/index";

export default function MeldButton() {
  const meldProposals = useSelector((state) => state.gameInfo.meldProposals);
  const dispatch = useDispatch();
  return (
    <div>
      {meldProposals && meldProposals.length > 1 && (
        <button onClick={() => dispatch(createMeldFromCards(meldProposals))}>
          meld
        </button>
      )}
    </div>
  );
}
