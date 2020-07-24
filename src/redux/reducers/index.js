import { combineReducers } from "redux";

import cards from "./cards";
import users from "./users";
import gameInfo from './gameInfo'

export default combineReducers({ cards, users, gameInfo });
