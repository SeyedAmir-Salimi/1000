import { number, string } from "prop-types";

import { CREATE_GAME, SET_GAME_INFO } from "../actions/actionTypes";

const initialState = {
  gameId: string,
  playerNumbers: number,
  round: number,
  set: number,
  opponents: null,
  hand: [],
  topOfTheDeck: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_GAME: {
      const { id, playerNumbers, round, set } = action.payload;
      console.log("CREATE_GAME", id);
      return {
        ...state,
        gameId: id,
        hand: [],
        opponents: null,
        topOfTheDeck: null,
        playerNumbers,
        round,
        set,
      };
    }
    case SET_GAME_INFO: {
      const {
        gameId,
        opponents,
        round,
        set,
        hand,
        topOfTheDeck,
      } = action.payload;
      console.log("SET_GAME_INFO", gameId);
      return { ...state, gameId, round, set, opponents, hand, topOfTheDeck };
    }
    default:
      return state;
  }
};
