import { FastifySchema } from "fastify";

type TFirstMessageRecieve = {
  health: boolean;
};

type TSendMessage = {
  approve: boolean;
};

const validateClientPayload = (payload: TFirstMessageRecieve): boolean => {
  return (
    typeof payload === "object" &&
    payload !== null &&
    Object.keys(payload).length === 1 &&
    typeof payload.health === "boolean"
  );
};

const wsHealthSchema: FastifySchema = {
  tags: ["WS"],
  summary: "Connection test - health check",
  description: `
      WebSocket Connection
      Upgrade to WebSocket connection on this endpoint. Use Postman instead of OPENAPI  
      
      Expected Client-to-Server Message: 
      json:
        { "health": true }

      Expected Server-to-Client Message:
      json:
        { "approve": true }
    `,
};

export { wsHealthSchema, validateClientPayload };
export type { TFirstMessageRecieve, TSendMessage };
