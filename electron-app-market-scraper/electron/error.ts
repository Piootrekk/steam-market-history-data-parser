const sanitizeError = (error: unknown): Error => {
  if (error instanceof Error) return error;
  else return new Error("Unknown invalid error");
};

export { sanitizeError };
