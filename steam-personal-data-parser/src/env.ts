import { config } from "dotenv";

config();

const getCookies = () => {
  const COOKIES = process.env.COOKIES;
  if (COOKIES === undefined) throw new Error("ENV COOKIES NOT FOUND");
  return COOKIES;
};

export { getCookies };
