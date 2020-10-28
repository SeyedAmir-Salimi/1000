import Axios from "axios";

export const fetchGameInfo = async (gameId) => {
  const result = await Axios.get(
    `https://rummy-game.netlify.app/game/${gameId}`
  );
  return result.data;
};

export const generateHands = async (gameId) => {
  const result = await Axios.post(
    `https://rummy-game.netlify.app/cards/generateHands`,
    {
      gameId,
    }
  );
  return result.data;
};

export const createGame = async (PN, username) => {
  const result = await Axios.post("https://rummy-game.netlify.app/game/start", {
    playerNumbers: PN,
    username,
  });
  return result.data;
};

export const discard = async (cardId, gameId) => {
  const result = await Axios.put(
    `https://rummy-game.netlify.app/actions/discard`,
    {
      id: cardId,
      gameId,
    }
  );
  return result.data;
};

export const createMeldFromCards = async (ids, meldId, gameId) => {
  const result = await Axios.put(
    `https://rummy-game.netlify.app/actions/meld`,
    {
      cardIds: ids,
      userId: "User4",
      gameId,
      selectedMeld: meldId,
    }
  );
  return result.data;
};

// multiPlayer
export const fetchGameRooms = async () => {
  const result = await Axios.get(`https://rummy-game.netlify.app/multiPlayer`);
  return result.data;
};
export const getGameMultinfo = async (gameId) => {
  const result = await Axios.get(
    `https://rummy-game.netlify.app/multiPlayer/${gameId}`
  );
  return result.data;
};

export const createMultiGame = async (username) => {
  const result = await Axios.post(
    `https://rummy-game.netlify.app/multiPlayer/create`,
    {
      username,
    }
  );
  sessionStorage.setItem("Rummy_gameId", result.data.id);
  sessionStorage.setItem("Rummy_UserUniqId", result.data.playerNames[0].id);
  return result.data;
};
export const startToPlayMulti = async (gameId) => {
  const result = await Axios.post(
    `https://rummy-game.netlify.app/multiPlayer/play`,
    {
      gameId,
    }
  );
  return result.data;
};

export const joinToMultiGame = async (gameId, username) => {
  const result = await Axios.patch(
    `https://rummy-game.netlify.app/multiPlayer/join`,
    {
      gameId,
      username,
    }
  );
  return result.data;
};

export const fetchGameStateMulti = async (gameId, user) => {
  const result = await Axios.get(
    `https://rummy-game.netlify.app/multiPlayer/gamestate/${gameId}-${user}`
  );
  return result.data;
};

export const discardMulti = async (cardId, gameId) => {
  const result = await Axios.put(
    `https://rummy-game.netlify.app/multiPlayer/discard`,
    {
      id: cardId,
      gameId,
    }
  );
  return result.data;
};

export const createMeldMultiFromCards = async (ids, userId, meldId, gameId) => {
  const result = await Axios.put(
    `https://rummy-game.netlify.app/multiPlayer/meld`,
    {
      cardIds: ids,
      userId,
      gameId,
      selectedMeld: meldId,
    }
  );
  return result.data;
};

export const sendMessagesMulti = async (name, message, gameId) => {
  const result = await Axios.post(
    `https://rummy-game.netlify.app/multiPlayer/messages`,
    {
      name,
      message,
      gameId,
    }
  );
  return result.data;
};
