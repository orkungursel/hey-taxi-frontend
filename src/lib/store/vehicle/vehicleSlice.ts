import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Vehicle } from "../../../models/Vehicle";
import { GetVehicle } from "../../api/vehicle";
import { RootState, useAppSelector } from "..";

interface VehicleState {
  currentVehicle?: Vehicle;
  currentVehicleId?: string;
  loading: boolean;
  error?: string;
}

const initialState: VehicleState = {
  currentVehicle: undefined,
  loading: false,
  error: undefined,
};

const slice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | undefined>) => {
      return { ...state, error: action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, loading: action.payload };
    },
    setCurrentVehicle: (state, action: PayloadAction<Vehicle | undefined>) => {
      return { ...state, currentVehicle: action.payload };
    },
    setCurrentVehicleId: (state, action: PayloadAction<string | undefined>) => {
      return { ...state, currentVehicleId: action.payload };
    },
    reset: () => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          action.type.startsWith(`${slice.name}/`) &&
          action.type.endsWith("/rejected"),
        (_, action) => {
          return {
            ...initialState,
            error: action?.error?.message || "Unknown error",
          };
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith(`${slice.name}/`) &&
          action.type.endsWith("/pending"),
        (state) => {
          return {
            ...state,
            loading: true,
            error: undefined,
          };
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith(`${slice.name}/`) &&
          !action.type.endsWith("/pending"),
        (state) => {
          return {
            ...state,
            loading: false,
          };
        },
      );
  },
});

// Actions
export const {
  setError,
  setLoading,
  reset,
  setCurrentVehicle,
  setCurrentVehicleId,
} = slice.actions;

export const GetCurrentVehicleThunk = createAsyncThunk(
  `${slice.name}/GetCurrentVehicleThunk`,
  async (vehicleId: string, { getState, dispatch }) => {
    const state = getState() as RootState;
    const vehicles = state.vehicleSelector.vehicles;

    if (vehicles.length > 0) {
      const currentVehicle = vehicles.find(
        (vehicle) => vehicle.id === vehicleId,
      );
      if (currentVehicle) {
        dispatch(setCurrentVehicle(currentVehicle));
        dispatch(setCurrentVehicleId(currentVehicle.id));
        return currentVehicle;
      }
    }

    const accessToken = state.auth.accessToken;

    if (!accessToken) {
      throw new Error("No access token");
    }

    const res = await GetVehicle(accessToken, vehicleId);

    dispatch(setCurrentVehicle(res));
    dispatch(setCurrentVehicleId(res.id));

    return res;
  },
);

// Hooks
const State = () => useAppSelector((state) => state[slice.name]);
export const UseCurrentVehicle = () => State().currentVehicle;
export const UseCurrentVehiclesLoading = () => State().loading;

// Reducer
export default slice;
