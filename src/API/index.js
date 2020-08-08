import Axios from "axios";
import Cookies from "js-cookie";
import { isEqual } from "lodash";

import {
  create_game,
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
    dispatch(toggle_my_turn());
    Axios.put(`http://localhost:3000/actions/discard`, {
      id: cardId,
      gameId,
    })
      .then((doc) => {
        const gameStates = doc.data;
        let delay = 0;
        gameStates.forEach((element) => {
          getDiff(getState().gameInfo, element)
          delay = delay + 500;
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
          delay = delay + 500;
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

function getDiff(oldState, newState) {
  const user1old = oldState.opponents.User1;
  const user1new = newState.opponents.User1;
  console.log(user1old, user1new);
  if (!isEqual(user1old, user1new)) {
    if (!isEqual(user1old.topOfTheMeld, user1new.topOfTheMeld)) {
      console.log("user1 melded");
    }
    if (!isEqual(user1old.cardCount, user1new.cardCount)) {
      console.log("user1 discarded");
    }
  }
}
