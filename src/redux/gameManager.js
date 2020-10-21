import io from "socket.io-client";

import {
  createMeldFromCards,
  createMeldMultiFromCards,
  discard,
  discardMulti,
  fetchGameInfo,
  fetchGameRooms,
  fetchGameStateMulti,
  generateHands,
  getGameMultinfo,
  joinToMultiGame,
  startToPlayMulti,
} from "../API";
import {
  create_game,
  created_multi_game,
  reset_ui_info,
  set_game_info,
  set_game_info_multi,
  set_game_rooms,
  set_multi_turn,
  set_ui_info,
  set_ui_info_multi,
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
    const gameStates = await discard(cardId, gameId);
    dispatch(toggle_my_turn());
    await handleGameStates(gameStates, dispatch);
    dispatch(toggle_my_turn());
  };
};

export const meldCards = (ids, meldId) => {
  const gameId = getGameId();
  return async (dispatch) => {
    const gameStates = await createMeldFromCards(ids, meldId, gameId);
    dispatch(toggle_my_turn());
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
  sessionStorage.setItem("Rummy_gameId", gameId);
}
function setUser(user) {
  sessionStorage.setItem("Rummy_user", user);
}

function getGameId() {
  return sessionStorage.getItem("Rummy_gameId");
}
function getUser() {
  return sessionStorage.getItem("Rummy_user");
}
function getUserName() {
  return sessionStorage.getItem("Rummy_multi_name");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// multiPlayer
export const getGameRooms = () => {
  return async (dispatch) => {
    const rooms = await fetchGameRooms();
    dispatch(set_game_rooms(rooms));
  };
};
export const createMultiGameCall = (result) => {
  return async (dispatch) => {
    dispatch(created_multi_game(result));
    setUser("User1");
  };
};
export const joinToMultiGameCall = (gameId, username) => {
  const socket = io("http://localhost:3000");
  const message = "Join";
  return async (dispatch) => {
    setGameId(gameId);
    const result = await joinToMultiGame(gameId, username);
    socket.emit("gameInfo", { username, gameId, message });
    dispatch(created_multi_game(result));
    setUser(result.yourData.user);
  };
};

export const getGameinfoCall = () => {
  const getId = getGameId();
  let gameId = "";
  if (getId !== null) {
    gameId = getId;
  } else {
    gameId = window.location.pathname.split("/multiPlayer/")[1];
  }
  return async (dispatch) => {
    const result = await getGameMultinfo(gameId);
    dispatch(created_multi_game(result));
  };
};
export const getGameStateMultiCall = () => {
  const gameId = getGameId();
  const user = getUser();
  return async (dispatch) => {
    const result = await fetchGameStateMulti(gameId, user);
    dispatch(set_ui_info_multi(result));
    dispatch(set_game_info_multi(result));
    dispatch(set_multi_turn(result.turn));
    if (result.action.type === "generateHands") {
      // for change color of the cards before generatehands
      // dispatch(set_game_info_multi(result));
      await sleep(generateHandAnimationDelay);
      dispatch(reset_ui_info());
    }
  };
};

export const startToPlayMultiCall = () => {
  const gameId = getGameId();
  const socket = io("http://localhost:3000");
  const message = "play";
  const username = getUserName();
  return async () => {
    await startToPlayMulti(gameId);
    socket.emit("gameInfo", { username, gameId, message });
    // dispatch(set_game_info(result));
    // dispatch(set_multi_turn(result.turn));
  };
};

export const discardCardMulti = (cardId) => {
  const gameId = getGameId();
  return async () => {
    await discardMulti(cardId, gameId);
  };
};

export const meldCardsMulti = (ids, meldId) => {
  const gameId = getGameId();
  const userId = getUser();
  return async (dispatch) => {
    try {
      await createMeldMultiFromCards(ids, userId, meldId, gameId);
    } catch (error) {
      const user = getUser();
      dispatch(set_multi_turn(user));
    }
  };
};

export async function handleGameStatesMulti(gameStates, dispatch) {

  for (const state of gameStates) {
    dispatch(set_ui_info_multi(state));
    dispatch(set_multi_turn(state.turn));

    if (state.action.type === "generateHands") {
      dispatch(set_game_info_multi(state));
      await sleep(8500);
    } else {
      await sleep(1400);
      dispatch(set_game_info_multi(state));
    }
    dispatch(reset_ui_info());
  }
}

export const getResultFromSocket = (gameStates) => {

  return async (dispatch) => {
    dispatch(toggle_my_turn());
    await handleGameStatesMulti(gameStates, dispatch);
    dispatch(toggle_my_turn());
  };
};

export const foundNewUserId = (gameInfo, id) => {
  if (gameInfo.playerNames && id) {
    const orginalUsersId = gameInfo.playerNames
      ? gameInfo.playerNames
      : undefined;

    const foundedId = orginalUsersId.find((x) => x.id === id);
    const sendUser = foundedId ? foundedId.user : undefined;
    return sendUser;
  }
};

export const foundNewUserIdNew = (gameInfo, id) => {
  if (gameInfo.opponents && gameInfo.yourData && id) {
    const newUserId =
      gameInfo.opponents && gameInfo.yourData && id
        ? [
            {
              user: gameInfo.opponents[Object.keys(gameInfo.opponents)[0]],
              userId: "User1",
            },
            {
              user: gameInfo.opponents[Object.keys(gameInfo.opponents)[1]],
              userId: "User2",
            },
            {
              user: gameInfo.opponents[Object.keys(gameInfo.opponents)[2]],
              userId: "User3",
            },
            {
              user: { id: gameInfo.yourData.id, name: gameInfo.yourData.name },
              userId: "User4",
            },
          ]
        : undefined;
    const foundedUser = newUserId
      ? newUserId.find((x) => x.user.id === id)
      : undefined;
    const sendUser = foundedUser ? foundedUser.userId : undefined;
    return sendUser;
  }
};
