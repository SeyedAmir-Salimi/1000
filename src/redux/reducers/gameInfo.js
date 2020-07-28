import { number, string } from "prop-types";

import {
  ADD_MELD_PROPOSAL,
  CREATE_GAME,
  DELETE_MELD_PROPOSAL,
  DISCARD_CARD,
  SET_GAME_INFO,
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
  meldProposals: [],
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
      } = action.payload;
      return { ...state, gameId, round, set, opponents, hand, topOfTheDeck };
    }

    case DISCARD_CARD: {
      const NewtopOfTheDeck = {
        id: action.payload.id,
        cardId: action.payload.cardId,
      };
      return {
        ...state,
        topOfTheDeck: NewtopOfTheDeck,
        hand: state.hand.filter((x) => x.id !== action.payload.id),
      };
    }

    case ADD_MELD_PROPOSAL: {
      const addedCard = [...state.meldProposals, action.payload];
      return {
        ...state,
        meldProposals: addedCard,
      };
    }

    case DELETE_MELD_PROPOSAL: {
      return {
        ...state,
        meldProposals: state.meldProposals.filter(
          (x) => x.id !== action.payload.id
        ),
      };
    }

    default:
      return state;
  }
};
