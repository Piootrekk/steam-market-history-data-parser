const standarizeCustomError = (err: unknown): CustomError => {
  if (err instanceof CustomError) return err;
  else return new CustomError("Unknown error", 500);
};

class CustomError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = "CustomError";
    this.status = status;

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export { CustomError, standarizeCustomError };
