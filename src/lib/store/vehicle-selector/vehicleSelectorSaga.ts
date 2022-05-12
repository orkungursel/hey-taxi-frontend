import { put, takeLatest } from "redux-saga/effects";

import { GetVehiclesThunk, setIsOpen } from "./vehicleSelectorSlice";

function* onSetIsOpen(action: ReturnType<typeof setIsOpen>) {
  const isOpen = action.payload;

  if (isOpen) {
    yield put(GetVehiclesThunk());
  }
}

export default function* VehicleSelectorSaga() {
  yield takeLatest(setIsOpen.type, onSetIsOpen);
}
