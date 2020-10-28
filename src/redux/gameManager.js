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
  sendMessagesMulti,
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
// function setUserUniqId(id) {
//   sessionStorage.setItem("Rummy_UserUniqId", id);
// }

function getGameId() {
  return sessionStorage.getItem("Rummy_gameId");
}
function getUser() {
  return sessionStorage.getItem("Rummy_user");
}
// function getUserUniqId() {
//   return sessionStorage.getItem("Rummy_UserUniqId");
// }
function getUserName() {
  return sessionStorage.getItem("Rummy_multi_name");
}
// function setUserName(user) {
//   sessionStorage.setItem("Rummy_multi_name", user);
// }

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
// export const joinToMultiGameCall = (gameId, username) => {
//   // eslint-disable-next-line no-unused-vars
//   let newError;
//   const socket = io("https://rummyapi.herokuapp.com", { transports: ["websocket"] });
//   const message = "join";
//   return async (dispatch) => {
//     setGameId(gameId);
//     const result = await joinToMultiGame(gameId, username);
//     setUserUniqId(result.yourData.id);
//     setUser(result.yourData.user);
//     setUserName(result.yourData.name);
//     dispatch(created_multi_game(result));
//     socket.emit(
//       "sendMessage",
//       { gameId, message, userId: result.yourData.id },
//       (error) => {
//         if (error) {
//           newError = error;
//         }
//       }
//     );
//   };
// };

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
      await sleep(generateHandAnimationDelay);
      dispatch(reset_ui_info());
    }
  };
};

export const startToPlayMultiCall = () => {
  // eslint-disable-next-line no-unused-vars
  let newError;
  const gameId = getGameId();
  const socket = io("https://rummyapi.herokuapp.com", { transports: ["websocket"] });
  return async () => {
    await startToPlayMulti(gameId);
    const message = "play";
    socket.emit("sendMessage", { gameId, message }, (error) => {
      if (error) {
        newError = error;
      }
    });
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

export const sendMessagesMultiCall = (message) => {
  const gameId = getGameId();
  const name = getUserName();
  return async () => {
    await sendMessagesMulti(name, message, gameId);
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
