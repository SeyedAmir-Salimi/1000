import "./Game.css";

import PropTypes from "prop-types";
import React, { useEffect } from "react";
import Draggable from "react-draggable";
import { connect } from "react-redux";

import { moveCard } from "../redux/actions";
import { getCards } from "../redux/selectors";

const Game = ({ cards, moveCard }) => {
  useEffect(() => {
    if (cards[0].position.x < 300) {
      cards.forEach((card) => {
        const newPos = {
          ...card.position,
          x: card.position.x + 10.5,
          y: card.position.y + 120.5,
        };
        moveCard(card.id, { position: newPos });
      });
    }
  });

  const adjustXPos = (e, id, position) => {
    e.preventDefault();
    e.stopPropagation();

    const newPos = { ...position, x: position.x + 10 };
    moveCard(id, { position: newPos });
  };

  const adjustYPos = (e, id, position) => {
    e.preventDefault();
    e.stopPropagation();

    const newPos = { ...position, y: position.y + 10 };
    moveCard(id, { position: newPos });
  };

  const onDrag = (e, position, id) => {
    moveCard(id, { position });
  };

  const cardsToShow = cards.map((card) => (
    <Draggable
      key={card.id}
      bounds="body"
      position={card.position}
      onDrag={(e, position) => onDrag(e, position, card.id)}
    >
      <div className="box">
        <div>
          <button
            href="#"
            onClick={(e) => {
              adjustXPos(e, card.id, card.position);
            }}
          >
            Adjust x ({card.position.x})
          </button>
        </div>
        <div>
          <button
            href="#"
            onClick={(e) => adjustYPos(e, card.id, card.position)}
          >
            Adjust y ({card.position.y})
          </button>
        </div>
      </div>
    </Draggable>
  ));

  return <div className="App">{cardsToShow}</div>;
};

const mapStateToProps = (state) => ({ cards: getCards(state) });

Game.propTypes = {
  cards: PropTypes.array,
  moveCard: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, { moveCard })(Game);
