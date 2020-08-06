import { number, string } from "prop-types";

import {
  ADD_SELECTED_CARD,
  CREATE_GAME,
  DELETE_SELECTED_CARD,
  SET_GAME_INFO,
  TOGGLE_MY_TURN,
  TOGGLE_SELECTED_MELD,
} from "../actions/actionTypes";

const initialState = {
  gameId: string,
  playerNumbers: number,
  round: number,
  set: number,
  points: {},
  opponents: null,
  hand: [],
  topOfTheMeld: null,
  topOfTheDeck: null,
  selectedCards: [],
  selectedMeld: null,
  isMyTurn: true,
  winner: null,
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
        topOfTheMeld: null,
        selectedCards: [],
        selectedMeld: null,
        playerNumbers,
        round,
        isMyTurn: true,
        set,
        points: {},
        winner: null,
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
        points,
        winner,
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
        points: points,
        winner,
      };
    }

    case ADD_SELECTED_CARD: {
      const updated = [...state.selectedCards, action.payload];
      return {
        ...state,
        selectedCards: updated,
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
        selectedMeld:
          action.payload === state.selectedMeld ? null : action.payload,
      };
    }

    case TOGGLE_MY_TURN: {
      return {
        ...state,
        isMyTurn: !state.isMyTurn,
      };
    }
    default:
      return state;
  }
};
