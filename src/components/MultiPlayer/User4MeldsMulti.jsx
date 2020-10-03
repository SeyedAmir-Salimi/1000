import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

import { foundNewUserId } from "../../redux/gameManager";
import Meld from "../Meld";

function User4Melds({ className }) {
  const topOfTheMeld = useSelector((state) => state.gameInfo.topOfTheMeld);
  const action = useSelector((state) => state.uiInfo);
  const gameInfo = useSelector((state) => state.gameInfo);


  return (
    <>
      {topOfTheMeld && (
        <div className={className}>
          <Meld key={topOfTheMeld.medlId} card={topOfTheMeld} />
        </div>
      )}
      {/* {action.user4NextMeld &&
        action.user !== actionUser &&
        action.otherUser === actionUser && (
          <div className="User4_topOfTheMeld meldSecondCard">
            <Meld
              key={action.user4NextMeld.medlId}
              card={action.user4NextMeld}
            />
          </div>
        )} */}
    </>
  );
}

User4Melds.propTypes = {
  className: PropTypes.string,
};
export default User4Melds;
