import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

import Meld from "../Meld";

function User4Melds({ className }) {
  const topOfTheMeld = useSelector((state) => state.gameInfo.topOfTheMeld);
  const action = useSelector((state) => state.uiInfo);
  return (
    <>
      {topOfTheMeld && (
        <div className={className}>
          <Meld key={topOfTheMeld.medlId} card={topOfTheMeld} />
        </div>
      )}
      {action.user4NextMeld &&
        action.user !== "User4" &&
        action.otherUser === "User4" && (
          <div className="User4_topOfTheMeld meldSecondCard">
            <Meld
              key={action.user4NextMeld.medlId}
              card={action.user4NextMeld}
            />
          </div>
        )}
    </>
  );
}

User4Melds.propTypes = {
  className: PropTypes.string,
};
export default User4Melds;
