import { configureStore } from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createReduxHistoryContext } from "redux-first-history";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import { rootReducer } from "./reducers";
import { rootSagas } from "./sagas";

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({ history: createBrowserHistory() });

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer(routerReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true }).concat(
      routerMiddleware,
      sagaMiddleware,
      logger,
    ),
});

export const history = createReduxHistory(store);

sagaMiddleware.run(rootSagas);

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
