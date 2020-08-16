import Axios from "axios";
import Cookies from "js-cookie";

import {
  create_game,
  reset_ui_info,
  set_game_info,
  set_ui_info,
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
  return (dispatch) => {
    dispatch(toggle_my_turn());
    Axios.put(`http://localhost:3000/actions/discard`, {
      id: cardId,
      gameId,
    })
      .then((doc) => {
        const gameStates = doc.data;
        let delay = 0;

        gameStates.forEach((element) => {
          setTimeout(() => {
            dispatch(set_ui_info(element.action));
            setTimeout(() => {
              dispatch(set_game_info(element));
              dispatch(set_ui_info({ type: null, user: null, cards: [] }));
              if (element === gameStates[gameStates.length - 1]) {
                dispatch(toggle_my_turn());
              }
            }, 500);
          }, delay);

          delay = delay + 1500;
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
