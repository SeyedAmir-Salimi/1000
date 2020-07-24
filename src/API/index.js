import Axios from 'axios'
import { get_used_card, create_game } from '../redux/actions/actions'
import Cookies from 'js-cookie'

export const fetchUsedCard = () => {
  const gameId = Cookies.get('Rummy_gameId')
  return dispatch => {
    Axios.get(`http://localhost:3000/game/${gameId}`)
      .then(doc => {
        const result = doc.data
        dispatch(get_used_card(result))
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export const createGame = PN => {
  const data = {
    playerNumbers: PN
  }
  return dispatch => {
    Axios.post('http://localhost:3000/game/start', data)
      .then(doc => {
        const result = doc.data
        dispatch(create_game(result))
        Cookies.set('Rummy_gameId', result.id)
        console.log(result);
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export const getCookies = () => {
  let info = {}
  info.gameId = Cookies.get('Rummy_gameId')
  return info
}
