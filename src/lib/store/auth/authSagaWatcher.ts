import { Task } from "redux-saga";
import { cancel, delay, fork, put, select, take } from "redux-saga/effects";

import { RootState } from "..";
import { AuthSagaAction } from "./AuthSagaAction";
import { RefreshTokenAsync } from "./authSlice";

export const refreshTokensThresholdInSeconds = 5;

export function* watchAccessToken() {
  while ((yield take(AuthSagaAction.START_REFRESH_TOKEN_WATCHING)) as string) {
    const refreshTokenTask: Task = yield fork(watchAccessTokenAndRefresh);
    yield take(AuthSagaAction.STOP_REFRESH_TOKEN_WATCHING);
    yield cancel(refreshTokenTask);
  }
}
function* watchAccessTokenAndRefresh() {
  const accessTokenExpiresAt = (yield select(
    (state: RootState) => state.auth.accessTokenExpiresAt,
  )) as number;

  if (!accessTokenExpiresAt) {
    return;
  }

  const refreshTokenDelay =
    accessTokenExpiresAt - refreshTokensThresholdInSeconds * 1000 - Date.now();

  if (refreshTokenDelay <= 0) {
    return;
  }

  yield delay(refreshTokenDelay);
  yield put(RefreshTokenAsync());
}
