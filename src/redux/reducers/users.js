import {
  tryGetMeldFromHand,
  tryGetMeldFromOtherMelds,
} from "../../providers/cardProvider";
import { GET_CARD, PLAY_CARD } from "../actionTypes";

const initialState = [
  { id: 0, cards: [], melds: [], score: 0, isTurn: true },
  { id: 1, cards: [], melds: [], score: 0, isTurn: false },
  { id: 2, cards: [], melds: [], score: 0, isTurn: false },
  { id: 3, cards: [], melds: [], score: 0, isTurn: false },
];

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CARD: {
      const { id, card } = action.payload;

      const usersSliced = state.slice();
      usersSliced[id].cards.push(card);

      const meldFromHand = tryGetMeldFromHand(usersSliced[id].cards);
      if (meldFromHand) {
        usersSliced[id].melds.push(meldFromHand);
      }

      const otherUsersLastMeld = state.map((x) => x.melds[x.melds.length - 1]);

      const meldFromOtherMelds = tryGetMeldFromOtherMelds(
        usersSliced[id].cards,
        otherUsersLastMeld
      );

      if (meldFromOtherMelds) {
        usersSliced[id].melds.push(meldFromOtherMelds);
      }
      return state;
    }
    case PLAY_CARD: {
      return state;
    }
    default:
      return state;
  }
}
