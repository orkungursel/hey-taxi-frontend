import { delay, fork, put, takeEvery } from "redux-saga/effects";

import { addNotification, removeNotification } from "./notificationSlice";

const defaultNotificationDuration = 5000;

function* onAddNotification(action: ReturnType<typeof addNotification>) {
  yield delay(action.payload.delay || defaultNotificationDuration);
  yield put(removeNotification(action.payload));
}

function* watch() {
  yield takeEvery(addNotification.type, onAddNotification);
}

export default function* notificationSaga() {
  yield fork(watch);
}
