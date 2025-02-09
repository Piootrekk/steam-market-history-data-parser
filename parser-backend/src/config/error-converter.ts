import { AxiosError } from "axios";

type TCustomError = {
  message: string;
  status?: number;
  options?: ErrorOptions;
};

type TError =
  | {
      customError: TCustomError;
      unknownError?: never;
    }
  | {
      unknownError: unknown;
      customError?: never;
    };

class CustomError extends Error {
  private codeStatus?: number;

  public constructor({ customError, unknownError }: TError) {
    let message = "An unknown error occurred ¯\\_(ツ)_/¯";
    let codeStatus: number | undefined;

    if (customError) {
      message = customError.message;
      codeStatus = customError.status;
    } else if (unknownError instanceof AxiosError && unknownError.request) {
      message = unknownError.request.message || "Request error occurred.";
      codeStatus = 500;
    } else if (unknownError instanceof AxiosError && unknownError.response) {
      message = unknownError.request.message || "Request error occurred.";
      message =
        unknownError.response.data?.message ||
        "An error occurred during the response.";
      codeStatus = unknownError.response.status;
    } else if (unknownError instanceof Error) {
      message = unknownError.message;
    } else if (typeof unknownError === "string") {
      message = unknownError;
    }

    super(message, customError?.options);
    this.name = "CustomError";
    this.codeStatus = codeStatus;
  }

  public get getStatus() {
    return this.codeStatus;
  }

  public get getMessage() {
    return this.message;
  }

  public logError = (info?: string) => {
    return `${info && info} Message: ${this.message} ${
      this.codeStatus && `, Status: ${this.codeStatus}`
    } Type: ${this.name} `;
  };
}

export default CustomError;
export type { TCustomError };
