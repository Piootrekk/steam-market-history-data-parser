import buildApp from "./app";
import { getPort } from "./config/env";
import CustomError from "./config/error-converter";

const main = async () => {
  const server = await buildApp();
  try {
    const port = getPort();
    await server.listen({ port: port, host: "0.0.0.0" });
  } catch (error) {
    const customError = new CustomError(error);
    server.log.error(customError.logError());
    process.exit(1);
  }
};

main();
