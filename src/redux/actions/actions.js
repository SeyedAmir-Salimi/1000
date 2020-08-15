import {
  ADD_SELECTED_CARD,
  CREATE_GAME,
  DELETE_SELECTED_CARD,
  SET_GAME_INFO,
  SET_UI_INFO,
  TOGGLE_MY_TURN,
  TOGGLE_SELECTED_MELD,
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

export const add_selected_card = (payload) => ({
  type: ADD_SELECTED_CARD,
  payload,
});

export const delete_selected_card = (payload) => ({
  type: DELETE_SELECTED_CARD,
  payload,
});

export const toggle_selected_meld = (payload) => ({
  type: TOGGLE_SELECTED_MELD,
  payload,
});

export const toggle_my_turn = () => ({
  type: TOGGLE_MY_TURN,
});

export const set_ui_info = (payload) => ({
  type: SET_UI_INFO,
  payload,
});