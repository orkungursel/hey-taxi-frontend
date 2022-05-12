import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  AccessTokenResponse,
  Login,
  LoginRequest,
  Me,
  RefreshTokenResponse,
  RefreshTokens,
  User,
} from "../../api/auth";
import { RootState, useAppSelector } from "..";

export enum AuthStatus {
  Idle = "idle",
  Loading = "loading",
  Authenticated = "authenticated",
  Unauthenticated = "unauthenticated",
}

interface AuthState {
  status: AuthStatus;
  user?: User;
  accessToken?: string;
  accessTokenExpiresAt?: number;
  refreshToken?: string;
  refreshTokenExpiresAt?: number;
  refreshCount: number;
  error?: string;
}

export interface AccessTokenResponseFromStorage {
  token: string;
  expiresAt: number;
}

export interface RefreshTokenResponseFromStorage {
  token: string;
  expiresAt: number;
}

const initialState: AuthState = {
  status: AuthStatus.Idle,
  refreshCount: 0,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SetAuthenticated: (state) => {
      return { ...state, status: AuthStatus.Authenticated };
    },
    SetUnauthenticated: (state) => {
      return {
        ...initialState,
        status: AuthStatus.Unauthenticated,
        error: state.error,
      };
    },
    SetLoading: (state) => {
      return { ...state, status: AuthStatus.Loading };
    },
    SetError: (state, action: PayloadAction<string | undefined>) => {
      return { ...state, error: action.payload };
    },
    SetUser: (state, action: PayloadAction<User>) => {
      return { ...state, user: action.payload };
    },
    SetAccessToken: function (
      state,
      action: PayloadAction<AccessTokenResponse>,
    ) {
      const now = Date.now();
      const { access_token, access_token_expires_in } = action.payload;

      return {
        ...state,
        accessToken: access_token,
        accessTokenExpiresAt: now + access_token_expires_in * 1000,
      };
    },
    SetRefreshToken: function (
      state,
      action: PayloadAction<RefreshTokenResponse>,
    ) {
      const now = Date.now();
      const { refresh_token, refresh_token_expires_in } = action.payload;

      return {
        ...state,
        refreshToken: refresh_token,
        refreshTokenExpiresAt: now + refresh_token_expires_in * 1000,
      };
    },
    SetAccessTokenFromStorage: function (
      state,
      action: PayloadAction<AccessTokenResponseFromStorage>,
    ) {
      const { token, expiresAt } = action.payload;

      return {
        ...state,
        accessToken: token,
        accessTokenExpiresAt: expiresAt,
      };
    },
    SetRefreshTokenFromStorage: function (
      state,
      action: PayloadAction<RefreshTokenResponseFromStorage>,
    ) {
      const { token, expiresAt } = action.payload;

      return {
        ...state,
        refreshToken: token,
        refreshTokenExpiresAt: expiresAt,
      };
    },
  },
  extraReducers: function (builder) {
    builder
      .addCase(LoginWithRefreshToken.pending, (state) => {
        return { ...state, status: AuthStatus.Loading, error: undefined };
      })
      .addCase(RefreshTokenAsync.fulfilled, (state) => {
        return {
          ...state,
          refreshCount: state.refreshCount + 1,
        };
      })
      .addMatcher(
        (action) =>
          action.type.startsWith(`${slice.name}/`) &&
          action.type.endsWith("/rejected"),
        (_, action) => {
          return {
            ...initialState,
            status: AuthStatus.Unauthenticated,
            error: action?.error?.message || "Unknown error",
          };
        },
      )
      .addMatcher(
        (action) =>
          [
            LoginAsync.pending.type,
            LoginWithRefreshToken.pending.type,
          ].includes(action.type),
        (state) => {
          return {
            ...state,
            status: AuthStatus.Loading,
            error: undefined,
          };
        },
      );
  },
});

// Thunks
export const LoginAsync = createAsyncThunk(
  `${slice.name}/LoginAsync`,
  async (req: LoginRequest, { dispatch }) => {
    const res = await Login(req);

    dispatch(SetRefreshToken(res));
    dispatch(SetAccessToken(res));
    dispatch(SetUser(res.user));
    dispatch(SetAuthenticated());

    return res;
  },
);

export const LogoutAsync = createAsyncThunk(
  `${slice.name}/LogoutAsync`,
  async (_, { dispatch }) => {
    dispatch(SetUnauthenticated());
  },
);

export const LoginWithRefreshToken = createAsyncThunk(
  `${slice.name}/LoginWithRefreshToken`,
  async (refreshToken: string, { dispatch }) => {
    const res = await RefreshTokens(refreshToken);
    dispatch(SetAccessToken(res));

    const user = await Me(res.access_token);

    dispatch(SetUser(user));
    dispatch(SetAuthenticated());

    return { ...res, user };
  },
);

export const RefreshTokenAsync = createAsyncThunk(
  `${slice.name}/RefreshTokenAsync`,
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState;
    const refreshToken = state.auth.refreshToken;

    if (!refreshToken) {
      throw new Error("No refresh token 1");
    }

    const res = await RefreshTokens(refreshToken);

    dispatch(SetAccessToken(res));

    return res;
  },
);

export const FetchUserAsync = createAsyncThunk(
  `${slice.name}/FetchUserAsync`,
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState;
    const accessToken = state.auth.accessToken;

    if (!accessToken) {
      throw new Error("No refresh token 2");
    }

    const res = await Me(accessToken);

    dispatch(SetUser(res));

    return res;
  },
);

// Actions
export const {
  SetUnauthenticated,
  SetAuthenticated,
  SetAccessToken,
  SetAccessTokenFromStorage,
  SetRefreshToken,
  SetRefreshTokenFromStorage,
  SetError,
  SetUser,
} = slice.actions;

// Hooks
const Select = () => useAppSelector((state) => state[slice.name]);
export const useAuth = () => Select();
export const useAuthUser = () => Select().user;
export const useAuthStatus = () => Select().status;
export const useAuthError = () => Select().error;
export const useIsAuthenticated = () =>
  Select().status === AuthStatus.Authenticated;
export default slice;
