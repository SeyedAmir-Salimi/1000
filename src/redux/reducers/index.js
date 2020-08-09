import { combineReducers } from "redux";

import event from "./event";
import gameInfo from "./gameInfo";

export default combineReducers({ gameInfo, event });
