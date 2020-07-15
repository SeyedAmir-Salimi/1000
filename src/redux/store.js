import { createStore } from "redux";

import rootReducer from "./reducers";

// const logger = (store) => (next) => (action) => {
//   console.log("dispatching", action);
//   let result = next(action);
//   console.log("next state", store.getState());
//   return result;
// };

export default createStore(
  rootReducer,
  window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_()
);
