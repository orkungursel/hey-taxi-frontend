import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Vehicle } from "../../../models/Vehicle";
import { GetVehicles } from "../../api/vehicle";
import { RootState, useAppSelector } from "..";

interface VehicleSelectorState {
  isOpen: boolean;
  vehicles: Vehicle[];
  loading: boolean;
  error?: string;
}

const initialState: VehicleSelectorState = {
  isOpen: false,
  vehicles: [],
  loading: false,
  error: undefined,
};

const slice = createSlice({
  name: "vehicleSelector",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | undefined>) => {
      return { ...state, error: action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, loading: action.payload };
    },
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      return { ...state, isOpen: action.payload };
    },
    setVehicles: (state, action: PayloadAction<Vehicle[]>) => {
      return { ...state, vehicles: action.payload };
    },
    resetVehicles: () => {
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
export const { setError, setLoading, setIsOpen, resetVehicles, setVehicles } =
  slice.actions;

export const GetVehiclesThunk = createAsyncThunk(
  `${slice.name}/GetVehiclesThunk`,
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const accessToken = state.auth.accessToken;

    if (!accessToken) {
      throw new Error("No access token");
    }

    const res = await GetVehicles(accessToken);

    dispatch(setVehicles(res));

    return res;
  },
);

// Hooks
const State = () => useAppSelector((state) => state[slice.name]);
export const UseVehicleSelector = () => State();
export const UseVehicleSelectorIsOpen = () => State().isOpen;

// Reducer
export default slice;
