export * as Saga from "redux-saga/effects";

declare module "redux-saga/effects" {
  export function put<A extends Action>(action: A): PutEffect<A>;
  export function put<T>(
    channel: PuttableChannel<T>,
    action: T | END,
  ): ChannelPutEffect<T>;
  export function put<A extends ThunkAction>(action: A): PutEffect<A>;
}
