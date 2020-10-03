import { RESET_UI_INFO, SET_UI_INFO } from "../actions/actionTypes";

const initialState = {
  type: null,
  user: null,
  otherUser: undefined,
  userId: null,
  otherUserId: null,
  cards: [],
  replaceTopofTheDeck: null,
  user1NextMeld: null,
  user2NextMeld: null,
  user3NextMeld: null,
  user4NextMeld: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_UI_INFO: {
      const {
        type,
        user,
        cards,
        otherUser,
        userId,
        otherUserId,
      } = action.payload.action;
      return {
        ...state,
        type,
        user,
        otherUser,
        userId,
        otherUserId,
        cards,
        replaceTopofTheDeck: action.payload.topOfTheDeck,
        // user1NextMeld: action.payload.opponents.User1.topOfTheMeld,
        // user2NextMeld: action.payload.opponents.User2.topOfTheMeld,
        // user3NextMeld: action.payload.opponents.User3.topOfTheMeld,
        user4NextMeld: action.payload.topOfTheMeld,
      };
    }
    case RESET_UI_INFO: {
      return initialState;
    }

    default:
      return state;
  }
};
