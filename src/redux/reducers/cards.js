import { getRandomCard } from "../../providers/cardProvider";
import { MOVE_CARD } from "../actions/actionTypes";

const initialState = [
  { id: 0, position: { x: -300, y: 0 } },
  { id: 1, position: { x: -250, y: 0 } },
  { id: 2, position: { x: -200, y: 0 } },
];

export default function (state = initialState, action) {
  switch (action.type) {
    case MOVE_CARD: {
      getRandomCard();

      const { id, position } = action.payload;
      const sliced = state.slice();
      sliced[id].position = position;
      return sliced;
    }
    default:
      return state;
  }
}
