import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

import { foundNewUserId } from "../../redux/gameManager";
import Meld from "../Meld";

function User2Melds({ className }) {
  const action = useSelector((state) => state.uiInfo);
  const opponents = useSelector((state) => state.gameInfo.opponents);

  const gameInfo = useSelector((state) => state.gameInfo);

  return (
    <>
      {opponents && opponents[Object.keys(opponents)[1]].topOfTheMeld && (
        <div className={className}>
          <Meld
            key={opponents[Object.keys(opponents)[1]].topOfTheMeld.medlId}
            card={opponents[Object.keys(opponents)[1]].topOfTheMeld}
          />
        </div>
      )}
      {/* {action.user2NextMeld &&
        action.user !== "User2" &&
        action.otherUser === "User2" && (
          <div className="User2_topOfTheMeld meldSecondCard">
            <Meld
              key={action.user2NextMeld.medlId}
              card={action.user2NextMeld}
            />
          </div>
        )} */}
    </>
  );
}

User2Melds.propTypes = {
  className: PropTypes.string,
};
export default User2Melds;
