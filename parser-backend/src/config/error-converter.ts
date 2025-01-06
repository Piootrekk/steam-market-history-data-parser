import { AxiosError } from "axios";

type TCustomError = {
  message: string;
  status?: number;
  options?: ErrorOptions;
};

class CustomError extends Error {
  private codeStatus?: number;

  public constructor(error: TCustomError | unknown) {
    if (CustomError.isCustomErrorType(error)) {
      super(error.message, error.options);
      this.codeStatus = error.status;
      this.name = "CustomError";
    }
    if (error instanceof AxiosError && error.request) {
      super(error.request.message);
      this.codeStatus = 500;
    }
    if (error instanceof AxiosError && error.response) {
      super(error.response.data.message);
      this.codeStatus = error.response.status;
    }
    if (error instanceof Error) super(error.message);
    else {
      super("An unknown error occurred ¯_(ツ)_/¯");
      this.name = "CustomError";
    }
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }

  public get getStatus() {
    return this.codeStatus;
  }

  private static isCustomErrorType = (
    error: unknown
  ): error is TCustomError => {
    return (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof (error as TCustomError).message === "string"
    );
  };

  public logError = (info?: string) => {
    return `${info && info} Message: ${this.message} ${
      this.codeStatus && `, Status: ${this.codeStatus}`
    } Type: ${this.name} `;
  };
}

export default CustomError;
