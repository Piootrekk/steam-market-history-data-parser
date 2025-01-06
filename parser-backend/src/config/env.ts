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
  return PORT;
};

export { getCookies, getPort };
