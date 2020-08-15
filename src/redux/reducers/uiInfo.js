import { SET_UI_INFO } from "../actions/actionTypes";

const initialState = {
  type: null,
  user: null,
  cards: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_UI_INFO: {
      const { type, user, cards } = action.payload;
      return { ...state, type, user, cards };
    }

    default:
      return state;
  }
};
