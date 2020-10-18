import {
  ADD_SELECTED_CARD,
  CREATE_GAME,
  CREATED_MULTI_GAME,
  DELETE_SELECTED_CARD,
  RESET_MULTI_TURN,
  RESET_UI_INFO,
  SET_GAME_INFO,
  SET_GAME_INFO_MULTI,
  SET_GAME_ROOMS,
  SET_MULTI_TURN,
  SET_UI_INFO,
  SET_UI_INFO_MULTI,
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

export const reset_ui_info = () => ({
  type: RESET_UI_INFO,
});

// Multi
export const set_game_rooms = (payload) => ({
  type: SET_GAME_ROOMS,
  payload,
});

export const created_multi_game = (payload) => ({
  type: CREATED_MULTI_GAME,
  payload,
});

export const set_game_info_multi = (cards) => {
  return {
    type: SET_GAME_INFO_MULTI,
    payload: cards,
  };
};
export const set_multi_turn = (payload) => {
  return {
    type: SET_MULTI_TURN,
    payload,
  };
};

export const reset_multi_turn = () => ({
  type: RESET_MULTI_TURN,
});

export const set_ui_info_multi = (payload) => ({
  type: SET_UI_INFO_MULTI,
  payload,
});