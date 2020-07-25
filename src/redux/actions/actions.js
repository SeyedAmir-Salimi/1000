import { GET_CARD, MOVE_CARD, GET_USED_CARD, CREATE_GAME, GET_GAME_ID} from './actionTypes'

export const moveCard = (id, content) => {
  return {
    type: MOVE_CARD,
    payload: {
      id: id,
      position: content.position
    }
  }
}

export const getCard = (id, content) => {
  return {
    type: GET_CARD,
    payload: {
      id: id,
      card: content.card
    }
  }
}

export const get_used_card = cards => {
  return {
    type: GET_USED_CARD,
    payload: cards
  }
}

export const create_game = info => {
  return {
    type: CREATE_GAME,
    payload: info
  }
}

export const get_game_id = info => {
  return {
    type: GET_GAME_ID,
    payload: info
  }
}
