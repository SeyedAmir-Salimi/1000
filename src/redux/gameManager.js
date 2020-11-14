import Cookies from "js-cookie";

import {
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

const generateHandAnimationDelay = 8500;

export const getGame = () => {
  const gameId = getGameId();
  return async (dispatch) => {
    if (gameId === undefined) return;
    const result = await fetchGameInfo(gameId);

    dispatch(set_game_info(result));
  };
};

export const getHands = () => {
  const gameId = getGameId();
  return async (dispatch) => {
    const result = await generateHands(gameId);
    dispatch(set_game_info(result));
  };
};

export const createNewGame = (newGame) => {
  return async (dispatch) => {
    setGameId(newGame.gameId);

    dispatch(create_game(newGame));

    dispatch(set_ui_info(newGame));
    await sleep(generateHandAnimationDelay);
    dispatch(reset_ui_info());
  };
};

export const discardCard = (cardId) => {
  const gameId = getGameId();
  return async (dispatch) => {
    dispatch(toggle_my_turn());
    const gameStates = await discard(cardId, gameId);
    await handleGameStates(gameStates, dispatch);
    dispatch(toggle_my_turn());
  };
};

export const meldCards = (ids, meldId) => {
  const gameId = getGameId();
  return async (dispatch) => {
    dispatch(toggle_my_turn());
    const gameStates = await createMeldFromCards(ids, meldId, gameId);
    await handleGameStates(gameStates, dispatch);
    dispatch(toggle_my_turn());
  };
};

async function handleGameStates(gameStates, dispatch) {
  for (const state of gameStates) {
    dispatch(set_ui_info(state));
    // delay between animations
    if (state.action.type === "generateHands") {
      // for change color of the cards before generatehands
      dispatch(set_game_info(state));
      await sleep(generateHandAnimationDelay);
    } else {
      await sleep(1400);
      dispatch(set_game_info(state));
    }

    dispatch(reset_ui_info());

    if (state === gameStates[gameStates.length - 1]) {
      continue;
    }

    // delay between each turn
    await sleep(2000);
  }
}

function setGameId(gameId) {
  Cookies.set("Rummy_gameId", gameId);
}

function getGameId() {
  return Cookies.get("Rummy_gameId");
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
