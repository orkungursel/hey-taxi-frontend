import { all } from "redux-saga/effects";

import authSaga from "./auth/authSaga";
import locationSaga from "./location/locationSaga";
import notificationSaga from "./notification/notificationSaga";
import vehicleSaga from "./vehicle/vehicleSaga";
import VehicleSelectorSaga from "./vehicle-selector/vehicleSelectorSaga";

export function* rootSagas() {
  yield all([
    authSaga(),
    locationSaga(),
    vehicleSaga(),
    VehicleSelectorSaga(),
    notificationSaga(),
  ]);
}
