export type AnyFunction = (...args: any[]) => any;
export type AnyObject = Record<string, any>;
export type AnyRecord = Record<string, any>;
export type AnyArray = any[];
export type AnyPromise = Promise<any>;
export type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;
export type Nullable<T> = T | null;
