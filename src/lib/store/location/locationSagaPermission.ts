import { END, eventChannel, Task } from "redux-saga";
import {
  cancel,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";

import { LocationActions } from "./LocationActions";
import { setError, setPermission } from "./locationSlice";

function* onLocationPermissionChange(permissionState: PermissionState) {
  if (permissionState === "granted") {
    yield put(setPermission(true));
    yield put(setError());
    return;
  }

  yield put(setPermission(false));
  yield put(setError("Geolocation permission denied"));
}

function* watchLocationPermission() {
  const locationPermissionChannel = eventChannel<PermissionState>((emitter) => {
    if (!navigator || !navigator.permissions) {
      emitter(END);

      return () => {
        console.warn("Geolocation permission not supported by your browser");
      };
    }

    let ps: PermissionStatus | undefined;

    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (permissionStatus) {
        ps = permissionStatus;
        ps.onchange = function () {
          emitter(this.state);
        };
      });

    return () => {
      if (ps) {
        ps.onchange = null;
      }
    };
  });

  yield takeEvery(locationPermissionChannel, onLocationPermissionChange);
}

function* onChangePermission(action: ReturnType<typeof setPermission>) {
  const hasPermission = action.payload;

  if (hasPermission) {
    yield put({ type: LocationActions.StopWatching });
    yield put({ type: LocationActions.StartWatching });
    return;
  }

  yield put({ type: LocationActions.StopWatching });
}

export function* initWatchLocationPermission() {
  yield takeLatest(setPermission.type, onChangePermission);

  while ((yield take(LocationActions.StartPermissionWatching)) as boolean) {
    const task = (yield fork(watchLocationPermission)) as Task;
    yield take(LocationActions.StopPermissionWatching);
    yield cancel(task);
  }
}
