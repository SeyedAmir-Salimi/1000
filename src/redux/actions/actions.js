import { CREATE_GAME, SET_GAME_INFO } from "./actionTypes";

export const set_game_info = (cards) => {
  return {
    type: SET_GAME_INFO,
    payload: cards,
  };
};

export const create_game = (info) => {
  return {
    type: CREATE_GAME,
    payload: info,
  };
};