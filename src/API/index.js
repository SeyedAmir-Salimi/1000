import Axios from "axios";
import Cookies from "js-cookie";
import { isEqual } from "lodash";

import {
  create_game,
  discard_opponent_card,
  set_event,
  set_game_info,
  toggle_my_turn,
} from "../redux/actions/actions";

export const fetchGameInfo = () => {
  const gameId = Cookies.get("Rummy_gameId");
  return (dispatch) => {
    Axios.get(`http://localhost:3000/game/${gameId}`)
      .then((doc) => {
        const result = doc.data;
        dispatch(set_game_info(result));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const generateHands = () => {
  const gameId = Cookies.get("Rummy_gameId");
  return (dispatch) => {
    Axios.post(`http://localhost:3000/cards/generateHands`, { gameId })
      .then((doc) => {
        const result = doc.data;
        dispatch(set_game_info(result));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const createGame = (PN) => {
  const data = {
    playerNumbers: PN,
  };
  return (dispatch) => {
    Axios.post("http://localhost:3000/game/start", data)
      .then((doc) => {
        dispatch(create_game(doc.data));
        Cookies.set("Rummy_gameId", doc.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const discard = (cardId) => {
  const gameId = Cookies.get("Rummy_gameId");
  return (dispatch, getState) => {
    let prevState = getState().gameInfo;

    dispatch(toggle_my_turn());
    Axios.put(`http://localhost:3000/actions/discard`, {
      id: cardId,
      gameId,
    })
      .then((doc) => {
        const gameStates = doc.data;
        let delay = 0;
        gameStates.forEach((element) => {
          delay = delay + 500;
          setTimeout(() => {
            for (const [key, value] of Object.entries(prevState.opponents)) {
              const userBefore = value;
              const userAfter = element.opponents[key];

              if (hasUserDiscarded(userBefore, userAfter)) {
                dispatch(
                  set_event({
                    user: key,
                    type: "discard",
                    cards: [element.topOfTheMeld],
                  })
                );
                // dispatch(discard_opponent_card({ user: key }));
              }
            }

            prevState = element;

            setTimeout(() => {
              dispatch(
                set_event({
                  user: null,
                  type: null,
                  cards: [],
                })
              );
              dispatch(set_game_info(element));
            }, 400);

            if (element === gameStates[gameStates.length - 1]) {
              dispatch(toggle_my_turn());
            }
          }, delay);
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(toggle_my_turn());
      });
  };
};

export const createMeldFromCards = (ids, meldId) => {
  return (dispatch) => {
    dispatch(toggle_my_turn());
    Axios.put(`http://localhost:3000/actions/meld`, {
      cardIds: ids,
      userId: "User4",
      gameId: Cookies.get("Rummy_gameId"),
      selectedMeld: meldId,
    })
      .then((doc) => {
        const gameStates = doc.data;
        let delay = 0;
        gameStates.forEach((element) => {
          delay = delay + 2000;
          setTimeout(() => {
            dispatch(set_game_info(element));
            if (element === gameStates[gameStates.length - 1]) {
              dispatch(toggle_my_turn());
            }
          }, delay);
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(toggle_my_turn());
      });
  };
};

function hasUserDiscarded(userBefore, userAfter) {
  if (!isEqual(userBefore, userAfter)) {
    if (!isEqual(userBefore.cardCount, userAfter.cardCount)) {
      if (!isEqual(userBefore.topOfTheMeld, userAfter.topOfTheMeld)) {
      } else {
        return true;
      }
    }
  }

  return false;
}

function hasUserMelded(oldState, newState) {
  return false;
}
