import { FastifySchema } from "fastify";

type TFirstMessageRecieve = {
  steamid: string;
  cookies: string;
};

type TSendMessage = {
  currentFetch: number;
  allFetches: number;
};

const validateClientPayload = (payload: TFirstMessageRecieve): boolean => {
  return (
    typeof payload === "object" &&
    typeof payload.steamid === "string" &&
    payload.steamid.length > 0 &&
    typeof payload.cookies === "string" &&
    payload.cookies.length > 0
  );
};

const marketSynchronizeSchema: { schema: FastifySchema } = {
  schema: {
    tags: ["WS - Market History (DB insert)"],
  },
};

const marketHistorySchema: { schema: FastifySchema } = {
  schema: {
    tags: ["WS - Market History (DB insert)"],
  },
};

export { marketHistorySchema, marketSynchronizeSchema, validateClientPayload };
export type { TFirstMessageRecieve, TSendMessage };
