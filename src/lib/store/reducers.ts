import { combineReducers } from "redux";

import authSlice from "./auth/authSlice";
import locationSlice from "./location/locationSlice";
import notification from "./notification/notificationSlice";
import vehicleSlice from "./vehicle/vehicleSlice";
import vehicleSelectorSlice from "./vehicle-selector/vehicleSelectorSlice";

export const rootReducer = (routerReducer: any) =>
  combineReducers({
    router: routerReducer,
    [authSlice.name]: authSlice.reducer,
    [locationSlice.name]: locationSlice.reducer,
    [vehicleSlice.name]: vehicleSlice.reducer,
    [vehicleSelectorSlice.name]: vehicleSelectorSlice.reducer,
    [notification.name]: notification.reducer,
  });
