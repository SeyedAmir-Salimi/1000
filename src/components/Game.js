import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_game_info  } from "../redux/actions/actions";
import { fetchUsedCard, createGame, getCookies } from '../API/index'
import Card from './Card'
import HandCard from './HandCard'

const Game = () => {
  const dispatch = useDispatch()
  const cards = useSelector(state => state.cards)
  // const hand = useSelector(state => state.gameInfo)

  // const cardsToShow = cards.map(card => <Card key={card.id} card={card} />)

  // const handCard = hand.map(card => <HandCard key={card.id} card={card} />)

  
  useEffect(() => {
    dispatch(fetchUsedCard())
    dispatch(get_game_info(getCookies()))
  },[])

  const createGameCall = () =>{
    dispatch(createGame(4))
  }

  return (
    <div>
      <h3 onClick={()=> createGameCall()}>create game</h3>
      {/* {handCard} */}
    </div>
  )
}

export default Game
