import { createStore, applyMiddleware, compose } from "redux";
import createRootReducer from "./reducers";
import thunkMiddleware from "redux-thunk";
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { middleware as flashMiddleware } from 'redux-flash'
import { createLogger } from "redux-logger";

const loggerMiddleware = createLogger()
export const history = createBrowserHistory();
const flashOptions = { timeout: 3000 }

import { getCsrftoken } from "./actions/common";

const store = createStore(
  createRootReducer(history),
  compose(
    applyMiddleware(
      routerMiddleware(history),
      thunkMiddleware,
      loggerMiddleware,
      flashMiddleware(flashOptions),
    )
  )
);

store.dispatch(getCsrftoken())

export default store
