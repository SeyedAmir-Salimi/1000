import { CREATED_MULTI_GAME, SET_GAME_ROOMS } from "../actions/actionTypes";

const initialState = {
  gameRooms: [],
  createdGame: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GAME_ROOMS: {
      return { ...state, gameRooms: action.payload };
    }
    case CREATED_MULTI_GAME: {
      return { ...state, createdGame: action.payload };
    }

    default:
      return state;
  }
};
