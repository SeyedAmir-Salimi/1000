import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_game_id } from '../redux/actions/actions'
import { fetchUsedCard, createGame, getCookies } from '../API/index'
import Card from './Card'
import OpponentHand from './OpponentHand'

const Game = () => {
  const dispatch = useDispatch()

  const hand = useSelector(state => state.gameInfo.hand)
  const topOfTheDeck = useSelector(state => state.gameInfo.topOfTheDeck)
  const opponents = useSelector(state => state.gameInfo.opponents)

  const handCard = hand.map(card => <Card key={card.id} card={card} />)
  const opponentHands = Object.entries(opponents).map(x => (
    <OpponentHand count={x[1].cardCount} />
  ))

  useEffect(() => {
    dispatch(fetchUsedCard())
    dispatch(get_game_id(getCookies()))
  }, [])

  const createGameCall = () => {
    dispatch(createGame(4))
  }
  console.log(opponents);

  return (
    <>
      <div>
        <h3 onClick={() => createGameCall()}>create game</h3>
        {handCard}
      </div>
      <div>
        {opponentHands}
        {topOfTheDeck !== null ? (
          <Card key={topOfTheDeck.id} card={topOfTheDeck} />
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default Game
