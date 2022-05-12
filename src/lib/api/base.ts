import axios, { AxiosRequestConfig } from "axios";

const sanitizeUrl = (url: string) => {
  if (url.endsWith("/")) {
    return url.slice(0, -1);
  }

  return url;
};

const joinToBaseUrl = (url: string) => {
  if (url.startsWith("/")) {
    return `${baseURL}${url}`;
  }

  return `${baseURL}/${url}`;
};

const baseURL = sanitizeUrl(
  process.env.REACT_APP_API_URL || "http://localhost:3001",
);

const sharedConfig: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const authApi = axios.create({
  baseURL: joinToBaseUrl("/auth"),
  ...sharedConfig,
});

export const locationApi = axios.create({
  baseURL: joinToBaseUrl("/location"),
  ...sharedConfig,
});

export const vehicleApi = axios.create({
  baseURL: joinToBaseUrl("/vehicle"),
  ...sharedConfig,
});
