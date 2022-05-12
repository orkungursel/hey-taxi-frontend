import axios from "axios";

import { authApi } from "./base";

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse
  extends AccessTokenResponse,
    RefreshTokenResponse {
  user: User;
}

export interface AccessTokenResponse {
  access_token: string;
  access_token_expires_in: number;
}

export interface RefreshTokenResponse {
  refresh_token: string;
  refresh_token_expires_in: number;
}

export async function Login(req: LoginRequest) {
  try {
    const { data } = await authApi.post<LoginResponse>("/login", req);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }

    throw error;
  }
}

export async function RefreshTokens(refreshToken: string) {
  try {
    const { data } = await authApi.post<AccessTokenResponse>("/refresh-token", {
      token: refreshToken,
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }

    throw error;
  }
}

export async function Me(token: string) {
  try {
    const { data } = await authApi.get<User>("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }

    throw error;
  }
}
