import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from "./reducers/index";

// const logger = (store) => (next) => (action) => {
//   console.log("dispatching", action);
//   let result = next(action);
//   console.log("next state", store.getState());
//   return result;
// };

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

