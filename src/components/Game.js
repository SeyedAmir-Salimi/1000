import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { moveCard } from "../redux/actions";
import Card from "./Card";

const Game = () => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards);

  // useEffect(() => {
  //   if (cards.some(({ position }) => position.x < 300)) {
  //     cards.forEach((card) => {
  //       const newPos = {
  //         ...card.position,
  //         x: card.position.x + 26,
  //       };
  //       dispatch(moveCard(card.id, { position: newPos }));
  //     });
  //   }
  // }, [cards, dispatch]);

  const cardsToShow = cards.map((card) => <Card key={card.id} card={card} />);

  return <>{cardsToShow}</>;
};

export default Game;
