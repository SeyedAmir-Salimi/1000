import { combineReducers } from "redux";

import gameInfo from "./gameInfo";
import multiInfo from "./multiInfo";
import uiInfo from "./uiInfo";

export default combineReducers({ gameInfo, uiInfo, multiInfo });
