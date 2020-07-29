import Axios from "axios";
import Cookies from "js-cookie";

import { create_game, set_game_info } from "../redux/actions/actions";

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
    Axios.patch(`http://localhost:3000/cards/discard`, { _id: cardId, gameId })
      .then((doc) => {
        const result = doc.data;
        dispatch(set_game_info(result));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const createMeldFromCards = (ids, meldId) => {
  return (dispatch) => {
    Axios.put(`http://localhost:3000/melds/`, {
      cardIds: ids,
      userId: "User4",
      gameId: Cookies.get("Rummy_gameId"),
      selectedMeld: meldId,
    })
      .then((doc) => {
        const result = doc.data;
        console.log("indexAPI", result);
        dispatch(set_game_info(result));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
