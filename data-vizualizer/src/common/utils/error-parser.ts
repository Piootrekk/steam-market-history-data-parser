const errorParser = (error: unknown): Error => {
  if (error instanceof Error) {
    return error;
  } else {
    return new Error(`Error not specified, ${JSON.stringify(error)}`);
  }
};

export { errorParser };
