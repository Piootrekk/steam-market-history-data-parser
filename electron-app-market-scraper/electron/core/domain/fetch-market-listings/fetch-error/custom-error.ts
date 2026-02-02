type FetchErrorType =
  | "UnknownError"
  | "ToManyRequestsError"
  | "InvalidResponseError"
  | "ResponseNotOk";

const getFetchError = (err: unknown): FetchError => {
  if (err instanceof FetchError) return err;
  else return new FetchError("Unknown error", "UnknownError");
};

class FetchError extends Error {
  constructor(
    message: string,
    public errorType: FetchErrorType,
  ) {
    super(message);
    this.name = "FetchError";
    Object.setPrototypeOf(this, FetchError.prototype);
  }
}
export { FetchError, getFetchError };
export type { FetchErrorType };
