import { fork, put, takeLatest } from "redux-saga/effects";

import { SetAuthenticated, SetUnauthenticated } from "../auth/authSlice";
import { LocationActions } from "./LocationActions";
import { initWatchLocationPermission } from "./locationSagaPermission";
import { initWatchLocation } from "./locationSagaWatcher";
import { setIsActive } from "./locationSlice";

function* onUserAuthenticated() {
  yield put(setIsActive(true));
}

function* onUserUnauthenticated() {
  yield put(setIsActive(false));
}

function* toogleLocationWatching(action: ReturnType<typeof setIsActive>) {
  const isActive = action.payload;

  yield put({ type: LocationActions.StopPermissionWatching });
  yield put({ type: LocationActions.StopWatching });

  if (!isActive) {
    return;
  }

  yield put({ type: LocationActions.StartPermissionWatching });
  yield put({ type: LocationActions.StartWatching });
}

export default function* locationSaga() {
  yield takeLatest(SetAuthenticated.type, onUserAuthenticated);
  yield takeLatest(SetUnauthenticated.type, onUserUnauthenticated);
  yield takeLatest(setIsActive.type, toogleLocationWatching);

  yield fork(initWatchLocation);
  yield fork(initWatchLocationPermission);
}
