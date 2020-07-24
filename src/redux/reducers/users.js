import {
  tryGetMeldFromHand,
  tryGetMeldFromOtherMelds,
} from "../../providers/cardProvider";
import { GET_CARD, PLAY_CARD } from "../actions/actionTypes";

const initialState = [
  {
    id: 0,
    cards: [
      {
        id: "2-diamonds",
        suit: "diamonds",
        value: "2",
      },
      {
        id: "3-diamonds",
        suit: "diamonds",
        value: "3",
      },
      {
        id: "2-hearts",
        suit: "hearts",
        value: "2",
      },
      {
        id: "3-hearts",
        suit: "hearts",
        value: "3",
      },
      {
        id: "2-clubs",
        suit: "clubs",
        value: "2",
      },
    ],
    melds: [],
    score: 0,
    isTurn: true,
  },
  { id: 1, cards: [], melds: [], score: 0, isTurn: false },
  { id: 2, cards: [], melds: [], score: 0, isTurn: false },
  { id: 3, cards: [], melds: [], score: 0, isTurn: false },
];

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CARD: {
      const { id, card } = action.payload;

      // const usersSliced = state.slice();
      // usersSliced[id].cards.push(card);

      const meldFromHand = tryGetMeldFromHand(state[id].cards);
      const copyState = [...state];
      const filtrthand = copyState[0].cards.filter(
        (x) => !meldFromHand.includes(x)
      );

      if ((meldFromHand, state[id].melds)) {
        state[id].melds.push(meldFromHand);
      }
      state[id].cards = filtrthand;

      console.log(state);
      // const otherUsersLastMeld = state.map((x) => x.melds[x.melds.length - 1]);

      // const meldFromOtherMelds = tryGetMeldFromOtherMelds(
      //   usersSliced[id].cards,
      //   otherUsersLastMeld
      // );

      // if (meldFromOtherMelds) {
      //   usersSliced[id].melds.push(meldFromOtherMelds);
      // }
      return state;
    }
    case PLAY_CARD: {
      return state;
    }
    default:
      return state;
  }
}
