import { config } from "dotenv";

config();

const getCookies = () => {
  const COOKIES = process.env.COOKIES;
  if (COOKIES === undefined) throw new Error("ENV COOKIES NOT FOUND");
  return COOKIES;
};

const getPort = () => {
  const PORT = process.env.PORT;
  if (PORT === undefined) throw new Error("ENV PORT NOT FOUND");
  return Number(PORT);
};

const getMongoConnectionString = () => {
  const MONGO_CON_STRING = process.env.MONGO_CON_STRING;
  if (MONGO_CON_STRING === undefined)
    throw new Error("MONGODB CONNECTION STRING NOT FOUND");
  return MONGO_CON_STRING;
};

export { getCookies, getPort, getMongoConnectionString };
