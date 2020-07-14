import { MOVE_CARD } from "../actionTypes";

const initialState = [
  { id: 0, position: { x: 0, y: 0 } },
  { id: 1, position: { x: 0, y: 0 } },
  { id: 2, position: { x: 0, y: 0 } },
];

export default function (state = initialState, action) {
  switch (action.type) {
    case MOVE_CARD: {
      const { id, position } = action.payload;
      const sliced = state.slice();
      sliced[id].position = position;
      return sliced;
    }
    // case ANIMATE: {
    //   // state.cards.forEach((card) => {
    //   //   const newPos = { ...card.position, x: card.position.x + 10 };
    //   //   const sliced = state.slice();
    //   //   sliced[card.id].position = card.position;
    //   //   return sliced;
    //   // });
    // }
    default:
      return state;
  }
}
