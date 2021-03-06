import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

import Meld from "./Meld";

function User1Melds({ className }) {
  const action = useSelector((state) => state.uiInfo);
  const opponents = useSelector((state) => state.gameInfo.opponents);
  return (
    <>
      {opponents && opponents.User1.topOfTheMeld && (
        <div className={className}>
          <Meld
            key={opponents.User1.topOfTheMeld.medlId}
            card={opponents.User1.topOfTheMeld}
          />
        </div>
      )}
      {action.user1NextMeld &&
        action.user !== "User1" &&
        action.otherUser === "User1" && (
          <div className="User1_topOfTheMeld meldSecondCard">
            <Meld
              key={action.user1NextMeld.medlId}
              card={action.user1NextMeld}
            />
          </div>
        )}
    </>
  );
}

User1Melds.propTypes = {
  className: PropTypes.string,
};
export default User1Melds;
