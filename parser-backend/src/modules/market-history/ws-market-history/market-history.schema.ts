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

const wsMarketHistorySchema: FastifySchema = {
  tags: ["WS"],
  summary: "Market History (DB insert)",
  description: `
      WebSocket Connection
      Upgrade to WebSocket connection on this endpoint. Use Postman instead of OPENAPI  
      
      Expected Client-to-Server Message: 
      json:
        {
          "steamid": "string",
          "cookies": "string"
        }

      Expected Server-to-Client Message:
      json:
        {
          "currentFetch": "number",
          "allFetches": "number"
        }
    `,
};

export { wsMarketHistorySchema, validateClientPayload };
export type { TFirstMessageRecieve, TSendMessage };
