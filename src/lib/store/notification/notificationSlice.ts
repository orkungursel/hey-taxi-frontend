import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export interface Notification {
  id?: number;
  message: string;
  type: "success" | "error" | "info" | "warning";
  delay?: number;
}

interface AuthState {
  notifications: Notification[];
}

const initialState: AuthState = {
  notifications: [],
};

let notificationIdStore = 0;

export const slice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<Notification>) {
      if (!action.payload.id) {
        action.payload.id = notificationIdStore++;
      }
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    },
    removeNotification(state, action: PayloadAction<Notification>) {
      return {
        ...state,
        notifications: state.notifications.filter(
          (n) => n.id !== action.payload.id,
        ),
      };
    },
    clearNotifications(state) {
      return {
        ...state,
        notifications: [],
      };
    },
  },
});

// Actions
export const { addNotification, removeNotification, clearNotifications } =
  slice.actions;

// Hooks
export const useNotifications = (): Notification | undefined =>
  useSelector((state: any) => state[slice.name].notifications?.[0]);
export const useNotificationsCount = (): number =>
  useSelector((state: any) => state[slice.name].notifications?.length || 0);

export default slice;
