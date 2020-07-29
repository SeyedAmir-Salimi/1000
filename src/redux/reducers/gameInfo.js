import { number, string } from "prop-types";

import {
  ADD_SELECTED_CARD,
  CREATE_GAME,
  DELETE_SELECTED_CARD,
  SET_GAME_INFO,
  TOGGLE_SELECTED_MELD,
} from "../actions/actionTypes";

const initialState = {
  gameId: string,
  playerNumbers: number,
  round: number,
  set: number,
  opponents: null,
  hand: [],
  topOfTheMeld: null,
  topOfTheDeck: null,
  selectedCards: [],
  selectedMeld: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_GAME: {
      const { id, playerNumbers, round, set } = action.payload;
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
        topOfTheMeld,
      } = action.payload;
      return {
        ...state,
        gameId,
        round,
        set,
        opponents,
        hand,
        topOfTheDeck,
        topOfTheMeld,
        selectedCards: [],
        selectedMeld: null,
      };
    }

    case ADD_SELECTED_CARD: {
      const uodated = [...state.selectedCards, action.payload];
      return {
        ...state,
        selectedCards: uodated,
      };
    }

    case DELETE_SELECTED_CARD: {
      return {
        ...state,
        selectedCards: state.selectedCards.filter((x) => x !== action.payload),
      };
    }

    case TOGGLE_SELECTED_MELD: {
      return {
        ...state,
        selectedMeld: state.selectedMeld ? null : action.payload,
      };
    }

    default:
      return state;
  }
};
