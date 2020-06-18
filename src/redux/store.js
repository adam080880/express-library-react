import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import logger from "redux-logger";

import rootReducers from "./reducers";

export default createStore(
  rootReducers,
  applyMiddleware(promiseMiddleware, logger)
);
