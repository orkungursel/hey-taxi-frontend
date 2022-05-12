import { Task } from "redux-saga";
import { call, cancel, delay, fork, put, take } from "redux-saga/effects";

import { LocationActions } from "./LocationActions";
import { setCurrentLocation, setError, setPermission } from "./locationSlice";

export function getLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator || !navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      (error) => {
        reject(error);
      },
    );
  });
}

function* watchLocation() {
  while (true) {
    try {
      const position = (yield call(getLocation)) as GeolocationPosition;

      yield put(
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      );
    } catch (error) {
      yield onCatchLocationError(error);
    } finally {
      yield delay(5000);
    }
  }
}

function* onCatchLocationError(error: unknown) {
  if (error instanceof GeolocationPositionError) {
    switch (error.code) {
      case 1:
        yield put(setError("Permission denied"));
        break;
      case 2:
        yield put(setError("Position unavailable"));
        break;
      case 3:
        yield put(setError("Timeout"));
        break;
      default:
        yield put(setError("Unknown error"));
        break;
    }
  }

  yield put(setPermission(false));
}

export function* initWatchLocation() {
  while ((yield take(LocationActions.StartWatching)) as boolean) {
    const task = (yield fork(watchLocation)) as Task;
    yield take(LocationActions.StopWatching);
    yield cancel(task);
  }
}
