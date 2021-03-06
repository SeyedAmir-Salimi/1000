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
    username: username,
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
