import { call, put, takeLatest } from "redux-saga/effects";

import { AuthSagaAction } from "./AuthSagaAction";
import { restartAccessTokenWatcher } from "./authSagaStorageWatcher";
import {
  SetAccessToken,
  SetRefreshToken,
  SetUnauthenticated,
  SetUser,
} from "./authSlice";

export const userLocalStorageKey = "APP_USER";
export const accessTokenLocalStorageKey = "APP_ACCESS_TOKEN";
export const refreshTokenLocalStorageKey = "APP_REFRESH_TOKEN";

// Access token storage
export function storeAccessTokenInLocalStorage(
  action: ReturnType<typeof SetAccessToken>,
) {
  localStorage.setItem(
    accessTokenLocalStorageKey,
    JSON.stringify({
      token: action.payload.access_token,
      expiresAt: action.payload.access_token_expires_in * 1000 + Date.now(),
    }),
  );
}

export function clearAccessTokenFromLocalStorage() {
  localStorage.removeItem(accessTokenLocalStorageKey);
}

export function* onChangeAccessToken(
  action: ReturnType<typeof SetAccessToken>,
) {
  yield put({
    type: AuthSagaAction.STORE_ACCESS_TOKEN,
    payload: action.payload,
  });
  yield call(restartAccessTokenWatcher);
}

// Refresh token storage
export function storeRefreshTokenInLocalStorage(
  action: ReturnType<typeof SetRefreshToken>,
) {
  localStorage.setItem(
    refreshTokenLocalStorageKey,
    JSON.stringify({
      token: action.payload.refresh_token,
      expiresAt: action.payload.refresh_token_expires_in * 1000 + Date.now(),
    }),
  );
}

export function* onChangeRefreshToken(
  action: ReturnType<typeof SetRefreshToken>,
) {
  yield put({
    type: AuthSagaAction.STORE_REFRESH_TOKEN,
    payload: action.payload,
  });
}

export function clearRefreshTokenFromLocalStorage() {
  localStorage.removeItem(refreshTokenLocalStorageKey);
}

// User data storage
export function storeUserInLocalStorage(action: ReturnType<typeof SetUser>) {
  localStorage.setItem(userLocalStorageKey, JSON.stringify(action.payload));
}

export function clearUserFromLocalStorage() {
  localStorage.removeItem(userLocalStorageKey);
}

export function* onUserChanged(action: ReturnType<typeof SetUser>) {
  yield put({ type: AuthSagaAction.STORE_USER, payload: action.payload });
}

function* onSetUnauthenticated() {
  yield put({ type: AuthSagaAction.STOP_REFRESH_TOKEN_WATCHING });
  yield put({ type: AuthSagaAction.CLEAR_REFRESH_TOKEN });
  yield put({ type: AuthSagaAction.CLEAR_ACCESS_TOKEN });
  yield put({ type: AuthSagaAction.CLEAR_USER });
}

export function* takeStorageActions() {
  yield takeLatest(SetAccessToken.type, onChangeAccessToken);
  yield takeLatest(SetRefreshToken.type, onChangeRefreshToken);
  yield takeLatest(SetUser.type, onUserChanged);
  yield takeLatest(SetUnauthenticated.type, onSetUnauthenticated);

  yield takeLatest(
    AuthSagaAction.STORE_ACCESS_TOKEN,
    storeAccessTokenInLocalStorage,
  );
  yield takeLatest(
    AuthSagaAction.CLEAR_ACCESS_TOKEN,
    clearAccessTokenFromLocalStorage,
  );
  yield takeLatest(
    AuthSagaAction.STORE_REFRESH_TOKEN,
    storeRefreshTokenInLocalStorage,
  );
  yield takeLatest(
    AuthSagaAction.CLEAR_REFRESH_TOKEN,
    clearRefreshTokenFromLocalStorage,
  );
  yield takeLatest(AuthSagaAction.STORE_USER, storeUserInLocalStorage);
  yield takeLatest(AuthSagaAction.CLEAR_USER, clearUserFromLocalStorage);
}
