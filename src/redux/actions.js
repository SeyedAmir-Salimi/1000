import { GET_CARD, MOVE_CARD } from "./actionTypes";

export const moveCard = (id, content) => {
  return {
    type: MOVE_CARD,
    payload: {
      id: id,
      position: content.position,
    },
  };
};

export const getCard = (id, content) => {
  return {
    type: GET_CARD,
    payload: {
      id: id,
      card: content.card,
    },
  };
};
