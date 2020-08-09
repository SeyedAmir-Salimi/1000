import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { set_event } from "../redux/actions/actions";
import ReversedCard from "./ReversedCard";

function OpponentHand({ user, count }) {
  const event = useSelector((state) => state.event);
  let isDiscarding = false;
  if (event && event.user === user) {
    switch (event.type) {
      case "discard": {
        isDiscarding = true;
        break;
      }
      default:
        break;
    }
  }

  let cards = [];
  for (let index = 0; index < count; index++) {
    cards.push(
      <ReversedCard
        key={`${user}-${index}`}
        cardKey={`${user}-${index}`}
        isDiscarding={isDiscarding && index + 1 === count ? true : false}
      />
    );
  }
  return <>{cards}</>;
}

OpponentHand.propTypes = {
  user: PropTypes.string,
  count: PropTypes.number,
  isDiscarding: PropTypes.bool,
};

export default OpponentHand;
