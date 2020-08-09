import { string } from "prop-types";

import { SET_EVENT } from "../actions/actionTypes";

const initialState = {
  type: string,
  user: string,
  cards: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENT: {
      const { type, user, cards } = action.payload;
      return {
        ...state,
        type,
        user,
        cards,
      };
    }
    default:
      return state;
  }
};
