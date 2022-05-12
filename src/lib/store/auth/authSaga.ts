import { push } from "redux-first-history";
import { fork, put, takeLatest } from "redux-saga/effects";

import { RoutePath } from "../../../app/routes";
import { addNotification } from "../notification/notificationSlice";
import { takeStorageActions } from "./authSagaStorage";
import {
  onInitMaybeLoginWhenTokenExists,
  watchLocalStorage,
} from "./authSagaStorageWatcher";
import { watchAccessToken } from "./authSagaWatcher";
import {
  LoginAsync,
  LoginWithRefreshToken,
  LogoutAsync,
  SetUnauthenticated,
} from "./authSlice";

/**
 * Success login side effects.
 */
function* onLoginSuccess(payload: ReturnType<typeof LoginAsync.fulfilled>) {
  yield put(addNotification({ message: "Login successful", type: "success" }));
  yield put(push(RoutePath.Home));
}

/**
 * Failure login side effects.
 */
function* onLoginFailed(action: ReturnType<typeof LoginAsync.rejected>) {
  yield put(SetUnauthenticated());

  // const message = action.error.message || "Login not success";
  // yield put(addNotification({ message, type: "error" }));
}

/**
 * Refreshing token side effects.
 */
function* onLoginFailedWhenRefreshingToken() {
  yield put(SetUnauthenticated());
}

/**
 * Logout side effects.
 */
function* onLogoutSuccess(payload: ReturnType<typeof LogoutAsync.fulfilled>) {
  yield put(addNotification({ message: "Logout", type: "warning" }));
  yield;
}

export default function* authSaga() {
  // Login effects
  yield takeLatest(LoginAsync.fulfilled.type, onLoginSuccess);
  yield takeLatest(LoginAsync.rejected.type, onLoginFailed);

  // Logout effects
  yield takeLatest(LogoutAsync.fulfilled, onLogoutSuccess);

  // Token effects
  yield takeLatest(
    LoginWithRefreshToken.rejected.type,
    onLoginFailedWhenRefreshingToken,
  );

  yield fork(takeStorageActions);
  yield fork(watchAccessToken);
  yield fork(watchLocalStorage);

  yield onInitMaybeLoginWhenTokenExists();
}
