import { eventChannel } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";

import { User } from "../../api/auth";
import { AuthSagaAction } from "./AuthSagaAction";
import {
  accessTokenLocalStorageKey,
  refreshTokenLocalStorageKey,
  userLocalStorageKey,
} from "./authSagaStorage";
import {
  AccessTokenResponseFromStorage,
  LoginWithRefreshToken,
  RefreshTokenResponseFromStorage,
  SetAccessTokenFromStorage,
  SetAuthenticated,
  SetRefreshTokenFromStorage,
  SetUnauthenticated,
  SetUser,
} from "./authSlice";

/**
 * If refresh token exists in local storage,
 * try to login with it.
 */
export function* onInitMaybeLoginWhenTokenExists() {
  try {
    const refreshToken = localStorage.getItem(refreshTokenLocalStorageKey);

    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const refreshTokenParsed: RefreshTokenResponseFromStorage =
      JSON.parse(refreshToken);

    yield put(SetRefreshTokenFromStorage(refreshTokenParsed));
    yield put(LoginWithRefreshToken(refreshTokenParsed.token));
  } catch (error) {
    yield put(SetUnauthenticated());
  }
}

function* onChangeAccessTokenLocalStorage(payload: string | null) {
  try {
    if (!payload) {
      throw new Error("No access token found");
    }

    const accessTokenParsed = JSON.parse(
      payload,
    ) as AccessTokenResponseFromStorage;
    yield put(SetAccessTokenFromStorage(accessTokenParsed));
    yield put(SetAuthenticated());
    yield call(restartAccessTokenWatcher);
  } catch (_) {
    yield put(SetUnauthenticated());
  }
}

function* onChangeRefreshTokenLocalStorage(payload: string | null) {
  if (!payload) {
    yield put(SetUnauthenticated());
    return;
  }

  try {
    const refreshTokenParsed = JSON.parse(
      payload,
    ) as RefreshTokenResponseFromStorage;
    yield put(SetRefreshTokenFromStorage(refreshTokenParsed));
    yield put(SetAuthenticated());
  } catch (_) {
    yield put(SetUnauthenticated());
  }
}

function* onChangeUserLocalStorage(payload: string | null) {
  if (!payload) {
    return;
  }

  try {
    const user = JSON.parse(payload) as User;
    yield put(SetUser(user));
  } catch (_) {
    yield put(SetUnauthenticated());
  }
}

function* onChangeLocalStorage(event: StorageEvent) {
  switch (event.key) {
    case accessTokenLocalStorageKey:
      yield onChangeAccessTokenLocalStorage(event.newValue);
      break;
    case refreshTokenLocalStorageKey:
      yield onChangeRefreshTokenLocalStorage(event.newValue);
      break;
    case userLocalStorageKey:
      yield onChangeUserLocalStorage(event.newValue);
      break;
  }
}

export function* restartAccessTokenWatcher() {
  yield put({ type: AuthSagaAction.STOP_REFRESH_TOKEN_WATCHING });
  yield put({ type: AuthSagaAction.START_REFRESH_TOKEN_WATCHING });
}

export function* watchLocalStorage() {
  const localStorageChannel = eventChannel((emitter) => {
    window.addEventListener("storage", emitter);
    return () => window.removeEventListener("storage", emitter);
  });

  yield takeEvery(localStorageChannel, onChangeLocalStorage);
}
