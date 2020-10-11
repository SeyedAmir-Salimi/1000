import {
  CREATED_MULTI_GAME,
  SET_GAME_ROOMS,
  SET_MULTI_TURN,
} from "../actions/actionTypes";

const initialState = {
  gameRooms: [],
  createdGame: {},
  turn: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GAME_ROOMS: {
      return { ...state, gameRooms: action.payload };
    }
    case CREATED_MULTI_GAME: {
      return { ...state, createdGame: action.payload };
    }
    case SET_MULTI_TURN: {
      return { ...state, turn: action.payload };
    }

    default:
      return state;
  }
};
