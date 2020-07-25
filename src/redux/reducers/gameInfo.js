import {
  CREATE_GAME,
  GET_GAME_ID,
  GET_USED_CARD
} from '../actions/actionTypes'
import { string, number } from 'prop-types'


const initialState = {
  gameId: string,
  playerNumbers: number,
  round: number,
  set: number,
  opponents: {},
  hand: [],
  topOfTheDeck: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_GAME: {
      const { id, playerNumbers, round, set } = action.payload
      return { ...state, gameId: id, playerNumbers, round, set }
    }

    case GET_GAME_ID: {
      const { gameId} = action.payload
      return { ...state, gameId}
    }
    case GET_USED_CARD: {
      const { opponents, round, set, hand, topOfTheDeck } = action.payload
      return { ...state, round, set, opponents, hand, topOfTheDeck }
    }
    default:
      return state
  }
}
