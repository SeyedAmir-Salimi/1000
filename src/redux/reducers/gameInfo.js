import { number, string } from "prop-types";

import {
  ADD_SELECTED_CARD,
  CREATE_GAME,
  DELETE_SELECTED_CARD,
  SET_GAME_INFO,
  SET_GAME_INFO_MULTI,
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
  deckCount: 0,
  selectedCards: [],
  selectedMeld: null,
  isMyTurn: true,
  winner: null,
  playerNames: [],
  yourData: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_GAME: {
      const {
        id,
        playerNumbers,
        round,
        set,
        playerNames,
        deckCount,
      } = action.payload;

      return {
        ...state,
        gameId: id,
        hand: [],
        opponents: null,
        topOfTheDeck: null,
        deckCount,
        topOfTheMeld: null,
        selectedCards: [],
        selectedMeld: null,
        playerNumbers,
        round,
        isMyTurn: true,
        set,
        points: {},
        winner: null,
        playerNames,
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
        deckCount,
        topOfTheMeld,
        points,
        winner,
        playerNames,
        yourData,
      } = action.payload;
      const prenNames = state.playerNames;
      const newNames = playerNames ? playerNames : prenNames;
      return {
        ...state,
        gameId,
        round,
        set,
        opponents,
        hand,
        topOfTheDeck,
        deckCount,
        topOfTheMeld,
        selectedCards: [],
        selectedMeld: null,
        points: points,
        winner,
        playerNames: newNames,
        yourData,
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
    case SET_GAME_INFO_MULTI: {
      const {
        gameId,
        opponents,
        round,
        set,
        hand,
        topOfTheDeck,
        deckCount,
        topOfTheMeld,
        points,
        winner,
        playerNames,
      } = action.payload;
      const prenNames = state.playerNames;
      const newNames = playerNames ? playerNames : prenNames;
      return {
        ...state,
        gameId,
        round,
        set,
        opponents,
        hand,
        topOfTheDeck,
        deckCount,
        topOfTheMeld,
        selectedCards: [],
        selectedMeld: null,
        points: points,
        winner,
        playerNames: newNames,
      };
    }
    default:
      return state;
  }
};
