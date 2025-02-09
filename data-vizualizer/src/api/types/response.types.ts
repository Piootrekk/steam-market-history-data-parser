type TResponse<T> =
  | {
      error: string;
      response: never;
    }
  | {
      error: never;
      response: T;
    };

export default TResponse;
