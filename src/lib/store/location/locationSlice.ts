import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { useAppSelector } from "..";

interface Location {
  latitude: number;
  longitude: number;
}

interface LocationState {
  isActive: boolean;
  hasPermission: boolean;
  current?: Location;
  error?: string;
}

const initialState: LocationState = {
  isActive: false,
  hasPermission: false,
  current: undefined,
  error: undefined,
};

const slice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setIsActive: (state, action: PayloadAction<boolean>) => {
      state = { ...state, isActive: action.payload };
      return state;
    },
    setPermission: (state, action: PayloadAction<boolean>) => {
      state = { ...state, hasPermission: action.payload };
      return state;
    },
    setCurrentLocation: (state, action: PayloadAction<Location>) => {
      state = { ...state, current: action.payload };
      return state;
    },
    setError: (state, action: PayloadAction<string | undefined>) => {
      state = { ...state, error: action.payload };
      return state;
    },
  },
});

// Actions
export const { setCurrentLocation, setIsActive, setPermission, setError } =
  slice.actions;

// Hooks
const Select = () => useAppSelector((state) => state[slice.name]);
export const useCurrentLocation = () => Select().current;
export const useLocationIsActive = () => Select().isActive;

// Reducer
export default slice;
