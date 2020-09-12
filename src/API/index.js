import Axios from "axios";

export const fetchGameInfo = async (gameId) => {
  const result = await Axios.get(
    `https://rummy-app.netlify.app/game/${gameId}`
  );
  return result.data;
};

export const generateHands = async (gameId) => {
  const result = await Axios.post(
    `https://rummy-app.netlify.app/cards/generateHands`,
    {
      gameId,
    }
  );
  return result.data;
};

export const createGame = async (PN, username) => {
  const result = await Axios.post("https://rummy-app.netlify.app/game/start", {
    playerNumbers: PN,
    username: username,
  });
  return result.data;
};

export const discard = async (cardId, gameId) => {
  const result = await Axios.put(
    `https://rummy-app.netlify.app/actions/discard`,
    {
      id: cardId,
      gameId,
    }
  );
  return result.data;
};

export const createMeldFromCards = async (ids, meldId, gameId) => {
  const result = await Axios.put(`https://rummy-app.netlify.app/actions/meld`, {
    cardIds: ids,
    userId: "User4",
    gameId,
    selectedMeld: meldId,
  });
  return result.data;
};
