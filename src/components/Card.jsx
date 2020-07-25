import './Card.css'
import React, { useEffect } from 'react'
import Draggable from 'react-draggable'
import { useDispatch } from 'react-redux'
import cardImages from '../assets/cards.json'

function Card ({ card }) {
  const dispatch = useDispatch()
  const cardObject = cardImages.filter(x => x.id === card.cardId)[0]

  const imageFile = require(`../assets/images/${cardObject.image}`)

  return (
    <Draggable key={card.id} bounds='body'>
      <div className='box' style={{ backgroundImage: `url(${imageFile})` }}>
      </div>
    </Draggable>
  )
}

export default Card
