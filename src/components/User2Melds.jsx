import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

import Meld from "./Meld";

function User2Melds({ className }) {
  const action = useSelector((state) => state.uiInfo);
  const opponents = useSelector((state) => state.gameInfo.opponents);
  return (
    <>
      {opponents && opponents.User2.topOfTheMeld && (
        <div className={className} data-testid="User2Melds">
          <Meld
            key={opponents.User2.topOfTheMeld.medlId}
            card={opponents.User2.topOfTheMeld}
          />
        </div>
      )}
      {action.user2NextMeld &&
        action.user !== "User2" &&
        action.otherUser === "User2" && (
          <div
            className="User2_topOfTheMeld meldSecondCard"
            data-testid={"user2NextMeld"}
          >
            <Meld
              key={action.user2NextMeld.medlId}
              card={action.user2NextMeld}
            />
          </div>
        )}
    </>
  );
}

User2Melds.propTypes = {
  className: PropTypes.string,
};
export default User2Melds;
