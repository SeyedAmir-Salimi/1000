import { MOVE_CARD } from "./actionTypes";

export const moveCard = (id, content) => ({
  type: MOVE_CARD,
  payload: {
    id: id,
    position: content.position,
  },
});
