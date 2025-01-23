import { config } from "dotenv";

config();

const getPort = () => {
  const PORT = process.env.PORT;
  if (PORT === undefined) return 1337;
  return Number(PORT);
};

const getMongoConnectionString = () => {
  const MONGO_CON_STRING = process.env.MONGO_CON_STRING;
  if (MONGO_CON_STRING === undefined)
    throw new Error("MONGODB CONNECTION STRING NOT FOUND");
  return MONGO_CON_STRING;
};

export { getPort, getMongoConnectionString };
