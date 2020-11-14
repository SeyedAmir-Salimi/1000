import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

import Meld from "./Meld";

function User3Melds({ className }) {
  const action = useSelector((state) => state.uiInfo);
  const opponents = useSelector((state) => state.gameInfo.opponents);
  return (
    <>
      {opponents && opponents.User3.topOfTheMeld && (
        <div className={className}>
          <Meld
            key={opponents.User3.topOfTheMeld.medlId}
            card={opponents.User3.topOfTheMeld}
          />
        </div>
      )}
      {action.user3NextMeld &&
        action.user !== "User3" &&
        action.otherUser === "User3" && (
          <div className="User3_topOfTheMeld meldSecondCard">
            <Meld
              key={action.user3NextMeld.medlId}
              card={action.user3NextMeld}
            />
          </div>
        )}
    </>
  );
}

User3Melds.propTypes = {
  className: PropTypes.string,
};
export default User3Melds;
