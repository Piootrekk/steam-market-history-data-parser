const promiseAll = <T extends any[]>(functions: {
  [K in keyof T]: () => Promise<T[K]>;
}): Promise<T> => {
  return Promise.all(functions.map((fn) => fn())) as Promise<T>;
};
export default promiseAll;
