import { combineReducers } from "redux";

import gameInfo from "./gameInfo";
import uiInfo from "./uiInfo";

export default combineReducers({ gameInfo, uiInfo });
