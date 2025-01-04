import { AxiosError } from "axios";

class CustomError extends Error {
  private codeStatus?: number;
  public constructor(message: string, status?: number, options?: ErrorOptions) {
    super(message, options);
    this.name = "CustomError";
    this.codeStatus = status;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }
  public get getStatus() {
    return this.codeStatus;
  }
}

const convertToCustomError = (error: unknown): CustomError => {
  if (error instanceof AxiosError) {
    if (error.response)
      return new CustomError(
        error.response.data.message,
        error.response.status
      );
    if (error.request) {
      return new CustomError(error.request.message, 500);
    }
  }
  if (error instanceof Error) {
    return new CustomError(error.message);
  } else return new CustomError("An unknown error occurred ¯\_(ツ)_/¯");
};

export { convertToCustomError };
export default CustomError;
