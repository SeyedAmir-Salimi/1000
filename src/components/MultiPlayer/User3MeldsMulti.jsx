import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

import Meld from "../Meld";

function User3Melds({ className }) {
  const action = useSelector((state) => state.uiInfo);
  const opponents = useSelector((state) => state.gameInfo.opponents);

  const gameInfo = useSelector((state) => state.gameInfo);

  let actionUser = "";
  if (opponents && gameInfo.playerNames) {
    const userId = opponents[Object.keys(opponents)[2]].id;
    const foundUser = gameInfo.playerNames.find((x) => x.id === userId);
    actionUser = foundUser ? foundUser.user : "";
  }

  return (
    <>
      {opponents && opponents[Object.keys(opponents)[2]].topOfTheMeld && (
        <div className={className}>
          <Meld
            key={opponents[Object.keys(opponents)[2]].topOfTheMeld.medlId}
            card={opponents[Object.keys(opponents)[2]].topOfTheMeld}
          />
        </div>
      )}
      {action.user3NextMeld &&
        action.user !== actionUser &&
        action.otherUser === actionUser && (
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
