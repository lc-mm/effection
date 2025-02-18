import { type Operation } from "./types.ts";

type AnyFunction<Args extends unknown[], R> = (...args: Args) => R;

type OperationFunction<Args extends unknown[], R> = (
  ...args: Args
) => Operation<R>;

export function op<Args extends unknown[], R>(
  fn: AnyFunction<Args, R>,
): OperationFunction<Args, R> {
  return (...args: Args) => {
    let value = fn(...args);
    let next = () => ({ done: true, value } as const);
    return ({
      [Symbol.iterator]: () => ({ next }),
    });
  };
}
