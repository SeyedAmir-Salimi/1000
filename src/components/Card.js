import "./Card.css";

import PropTypes from "prop-types";
import React from "react";
import Draggable from "react-draggable";
import { useDispatch } from "react-redux";

import { getCard, moveCard } from "../redux/actions";

function Card({ card }) {
  const dispatch = useDispatch();

  const invokeGetCard = (e, id, card) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(getCard(id, { card }));
  };

  const adjustXPos = (e, id, position) => {
    e.preventDefault();
    e.stopPropagation();

    const newPos = { ...position, x: position.x + 10 };
    dispatch(moveCard(id, { position: newPos }));
  };

  const adjustYPos = (e, id, position) => {
    e.preventDefault();
    e.stopPropagation();

    const newPos = { ...position, y: position.y + 10 };
    dispatch(moveCard(id, { position: newPos }));
  };

  const onDrag = (e, position, id) => {
    dispatch(moveCard(id, { position }));
  };

  return (
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
          <button
            href="#"
            onClick={(e) =>
              invokeGetCard(e, 0, {
                id: "7-hearts",
                suit: "hearts",
                value: "7",
              })
            }
          >
            Get Card
          </button>
        </div>
      </div>
    </Draggable>
  );
}

Card.propTypes = {
  card: PropTypes.object,
};

export default Card;
