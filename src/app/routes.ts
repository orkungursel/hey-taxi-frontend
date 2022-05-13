import { LoginType } from "../pages/login/LoginType";

export enum RoutePath {
  Home = "/",
  Login = "/login",
  LoginWithType = "/login/:type",
  Register = "/register",
  ForgotPassword = "/forgot-password",
}

type T = [RoutePath.LoginWithType, { type: LoginType }];

export function buildRoutePathWithParams(...args: T): string {
  const [path, params] = args;

  if (typeof params === "undefined") return path;

  return Object.entries(params).reduce(
    (previousValue: string, [param, value]) =>
      previousValue.replace(`:${param}`, `${value}`),
    path,
  );
}
