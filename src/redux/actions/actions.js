import {
  ADD_MELD_PROPOSAL,
  CREATE_GAME,
  DELETE_MELD_PROPOSAL,
  DISCARD_CARD,
  SET_GAME_INFO,
} from "./actionTypes";

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

export const discard_card = (payload) => ({
  type: DISCARD_CARD,
  payload,
});

export const add_meld_proposal = (payload) => ({
  type: ADD_MELD_PROPOSAL,
  payload,
});

export const delete_meld_proposal = (payload) => ({
  type: DELETE_MELD_PROPOSAL,
  payload,
});
