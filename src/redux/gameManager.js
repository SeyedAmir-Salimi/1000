import Cookies from "js-cookie";

import {
  createGame,
  createMeldFromCards,
  discard,
  fetchGameInfo,
  generateHands,
} from "../API";
import {
  create_game,
  reset_ui_info,
  set_game_info,
  set_ui_info,
  toggle_my_turn,
} from "./actions/actions";

export const getGame = () => {
  const gameId = Cookies.get("Rummy_gameId");
  return async (dispatch) => {
    const result = await fetchGameInfo(gameId);
    dispatch(set_game_info(result));
  };
};

export const getHands = () => {
  const gameId = Cookies.get("Rummy_gameId");
  return async (dispatch) => {
    const result = await generateHands(gameId);
    dispatch(set_game_info(result));
  };
};

export const createNewGame = () => {
  return async (dispatch) => {
    const result = await createGame(4);
    dispatch(create_game(result));
  };
};

export const discardCard = (cardId) => {
  const gameId = Cookies.get("Rummy_gameId");
  return async (dispatch) => {
    dispatch(toggle_my_turn());
    const gameStates = await discard(cardId, gameId);
    handleGameStates(gameStates, dispatch);
  };
};

export const meldCards = (ids, meldId) => {
  const gameId = Cookies.get("Rummy_gameId");
  return async (dispatch) => {
    dispatch(toggle_my_turn());
    const gameStates = await createMeldFromCards(ids, meldId, gameId);
    handleGameStates(gameStates, dispatch);
  };
};

function handleGameStates(gameStates, dispatch) {
  let delay = 0;
  gameStates.forEach((element) => {
    setTimeout(() => {
      dispatch(set_ui_info(element));

      setTimeout(() => {
        dispatch(set_game_info(element));

        dispatch(reset_ui_info());

        if (element === gameStates[gameStates.length - 1]) {
          dispatch(toggle_my_turn());
        }
      }, 800);
    }, delay);

    delay = delay + 1500;
  });
}
