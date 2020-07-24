import {
  CREATE_GAME,
  GET_GAME_INFO,
  GET_USED_CARD
} from '../actions/actionTypes'
import { number } from 'prop-types'

const initialState = {
  gameId: '',
  playerNumbers: '',
  round: number,
  set: number,
  opponents: {},
  hand: [],
  deck: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_GAME: {
      const { id, playerNumbers, round, set } = action.payload
      return { ...state, gameId: id, playerNumbers, round, set }
    }

    case GET_GAME_INFO: {
      const { gameId, playerNumbers, round, set } = action.payload
      return { ...state, gameId, playerNumbers, round, set }
    }
    case GET_USED_CARD: {
      const { opponents, round, set, hand, deck } = action.payload
      return { ...state, round, set, opponents, hand, deck }
    }
    default:
      return state
  }
}
