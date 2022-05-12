import { eventChannel } from "redux-saga";
import { fork, put, takeEvery } from "redux-saga/effects";

import { SetAuthenticated, SetUnauthenticated } from "../auth/authSlice";
import {
  GetCurrentVehicleThunk,
  reset,
  setCurrentVehicleId,
} from "./vehicleSlice";

const currentVehicleIdLocalStorageKey = "currentVehicleId";

function* onUserAuthenticated() {
  yield init();
}

function* onUserUnauthenticated() {
  yield put(reset());
  yield put(setCurrentVehicleId(undefined));
}

function* onChangeLocalStorage(event: StorageEvent) {
  if (event.key === currentVehicleIdLocalStorageKey) {
    yield put(setCurrentVehicleId(event.newValue ?? undefined));
  }
}

function onCurrentVehicleIdChanged(
  action: ReturnType<typeof setCurrentVehicleId>,
) {
  const id = action.payload;
  console.log("id", id);
  if (id) {
    storeCurrentVehicleIdInLocalStorage(id);
    return;
  }

  clearCurrentVehicleIdInLocalStorage();
}

export function storeCurrentVehicleIdInLocalStorage(id: string) {
  localStorage.setItem(currentVehicleIdLocalStorageKey, id);
}

export function clearCurrentVehicleIdInLocalStorage() {
  localStorage.removeItem(currentVehicleIdLocalStorageKey);
}

export function* watchLocalStorage() {
  const localStorageChannel = eventChannel((emitter) => {
    window.addEventListener("storage", emitter);
    return () => window.removeEventListener("storage", emitter);
  });

  yield takeEvery(localStorageChannel, onChangeLocalStorage);
}

/**
 * If refresh token exists in local storage,
 * try to login with it.
 */
function* init() {
  try {
    const currentVehicleId = localStorage.getItem(
      currentVehicleIdLocalStorageKey,
    );

    if (!currentVehicleId) {
      return;
    }

    yield put(GetCurrentVehicleThunk(currentVehicleId));
  } catch (error) {
    console.log(error);
  }
}

export default function* vehicleSaga() {
  yield takeEvery(SetAuthenticated.type, onUserAuthenticated);
  yield takeEvery(SetUnauthenticated.type, onUserUnauthenticated);
  yield takeEvery(setCurrentVehicleId.type, onCurrentVehicleIdChanged);

  yield fork(watchLocalStorage);
}
