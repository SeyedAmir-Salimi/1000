import Axios from "axios";
import Cookies from "js-cookie";

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
  return (dispatch) => {
    dispatch(toggle_my_turn());
    Axios.put(`http://localhost:3000/actions/discard`, {
      id: cardId,
      gameId,
    })
      .then((doc) => {
        const gameStates = doc.data;
        dispatch(set_game_info(gameStates[0]));

        setTimeout(() => {
          dispatch(set_game_info(gameStates[1]));
        }, 1500);

        setTimeout(() => {
          dispatch(set_game_info(gameStates[2]));
        }, 2500);

        setTimeout(() => {
          dispatch(set_game_info(gameStates[3]));
          if (!gameStates[4]) {
            dispatch(toggle_my_turn());
          }
        }, 3500);

        if (gameStates[4]) {
          setTimeout(() => {
            dispatch(set_game_info(gameStates[4]));
            dispatch(toggle_my_turn());
          }, 4000);
        }

        if (gameStates[5]) {
          setTimeout(() => {
            dispatch(set_game_info(gameStates[5]));
            dispatch(toggle_my_turn());
          }, 5000);
        }

        if (gameStates[6]) {
          setTimeout(() => {
            dispatch(set_game_info(gameStates[6]));
            dispatch(toggle_my_turn());
          }, 6000);
        }

        if (gameStates[7]) {
          setTimeout(() => {
            dispatch(set_game_info(gameStates[7]));
            dispatch(toggle_my_turn());
          }, 7000);
        }

        if (gameStates[8]) {
          setTimeout(() => {
            dispatch(set_game_info(gameStates[8]));
            dispatch(toggle_my_turn());
          }, 8000);
        }

        if (gameStates[9]) {
          setTimeout(() => {
            dispatch(set_game_info(gameStates[9]));
            dispatch(toggle_my_turn());
          }, 9000);
        }
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
        dispatch(set_game_info(gameStates[0]));

        setTimeout(() => {
          dispatch(set_game_info(gameStates[1]));
        }, 1500);

        setTimeout(() => {
          dispatch(set_game_info(gameStates[2]));
        }, 2500);

        setTimeout(() => {
          dispatch(set_game_info(gameStates[3]));
          dispatch(toggle_my_turn());
        }, 3500);

        if (gameStates[4]) {
          setTimeout(() => {
            dispatch(set_game_info(gameStates[4]));
            dispatch(toggle_my_turn());
          }, 4000);
        }

        if (gameStates[5]) {
          setTimeout(() => {
            dispatch(set_game_info(gameStates[5]));
            dispatch(toggle_my_turn());
          }, 5000);
        }

        if (gameStates[6]) {
          setTimeout(() => {
            dispatch(set_game_info(gameStates[6]));
            dispatch(toggle_my_turn());
          }, 6000);
        }

        if (gameStates[7]) {
          setTimeout(() => {
            dispatch(set_game_info(gameStates[7]));
            dispatch(toggle_my_turn());
          }, 7000);
        }

        if (gameStates[8]) {
          setTimeout(() => {
            dispatch(set_game_info(gameStates[8]));
            dispatch(toggle_my_turn());
          }, 8000);
        }

        if (gameStates[9]) {
          setTimeout(() => {
            dispatch(set_game_info(gameStates[9]));
            dispatch(toggle_my_turn());
          }, 9000);
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(toggle_my_turn());
      });
  };
};
