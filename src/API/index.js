import Axios from "axios";

export const fetchGameInfo = async (gameId) => {
  const result = await Axios.get(`http://localhost:3000/game/${gameId}`);
  return result.data;
};

export const generateHands = async (gameId) => {
  const result = await Axios.post(`http://localhost:3000/cards/generateHands`, {
    gameId,
  });
  return result.data;
};

export const createGame = async (PN, username) => {
  const result = await Axios.post("http://localhost:3000/game/start", {
    playerNumbers: PN,
    username,
  });
  return result.data;
};

export const discard = async (cardId, gameId) => {
  const result = await Axios.put(`http://localhost:3000/actions/discard`, {
    id: cardId,
    gameId,
  });
  return result.data;
};

export const createMeldFromCards = async (ids, meldId, gameId) => {
  const result = await Axios.put(`http://localhost:3000/actions/meld`, {
    cardIds: ids,
    userId: "User4",
    gameId,
    selectedMeld: meldId,
  });
  return result.data;
};

// multiPlayer
export const fetchGameRooms = async () => {
  const result = await Axios.get(`http://localhost:3000/multiPlayer`);
  return result.data;
};
export const getGameMultinfo = async (gameId) => {
  const result = await Axios.get(`http://localhost:3000/multiPlayer/${gameId}`);
  return result.data;
};

export const createMultiGame = async (username) => {
  const result = await Axios.post(`http://localhost:3000/multiPlayer/create`, {
    username,
  });
  sessionStorage.setItem("Rummy_gameId", result.data.id);
  return result.data;
};
export const startToPlayMulti = async (gameId) => {
  const result = await Axios.post(`http://localhost:3000/multiPlayer/play`, {
    gameId,
  });
  return result.data;
};

export const joinToMultiGame = async (gameId, username) => {
  const result = await Axios.patch(`http://localhost:3000/multiPlayer/join`, {
    gameId,
    username,
  });
  return result.data;
};

export const fetchGameStateMulti = async (gameId, user) => {
  const result = await Axios.get(
    `http://localhost:3000/multiPlayer/gamestate/${gameId}-${user}`
  );
  return result.data;
};

export const discardMulti = async (cardId, gameId) => {
  const result = await Axios.put(`http://localhost:3000/multiPlayer/discard`, {
    id: cardId,
    gameId,
  });
  return result.data;
};

export const createMeldMultiFromCards = async (ids, userId, meldId, gameId) => {
  const result = await Axios.put(`http://localhost:3000/multiPlayer/meld`, {
    cardIds: ids,
    userId,
    gameId,
    selectedMeld: meldId,
  });
  return result.data;
};