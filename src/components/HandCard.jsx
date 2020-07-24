import './Card.css'
import React from 'react'
import PropTypes from 'prop-types'
import Draggable from 'react-draggable'
import { useDispatch } from 'react-redux'
import { getCard, moveCard } from '../redux/actions/actions'

function Card ({ card }) {
  const dispatch = useDispatch()

  return (
    <Draggable key={card.id} bounds='body'>
      <div className='box' >
        <div>
          <button>Adjust x</button>
        </div>
        <div>
          <button>Adjust y</button>
          <button>Get Card</button>
        </div>
      </div>
    </Draggable>
  )
}

export default Card
