import { FastifySchema } from "fastify";
import { TSSEClient } from "../../sse-client.types";

type TRequestBody = {
  steamid: string;
  cookies: string;
};

type SSEMessageModel = {
  currentFetch: number;
  allFetches: number;
};

type TSSEClientMessageModel = TSSEClient<SSEMessageModel>;

const marketSynchronizeSchema: { schema: FastifySchema } = {
  schema: {
    tags: ["SSE - Market History (DB insert)"],
    body: {
      type: "object",
      required: ["steamid", "cookies"],
      properties: {
        steamid: { type: "string" },
        cookies: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          success: { type: "boolean" },
        },
      },
    },
  },
};

const marketHistorySchema: { schema: FastifySchema } = {
  schema: {
    tags: ["SSE - Market History (DB insert)"],
    body: {
      type: "object",
      required: ["steamid", "cookies"],
      properties: {
        steamid: { type: "string" },
        cookies: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          success: { type: "boolean" },
        },
      },
      "5xx": {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
};

export { marketHistorySchema, marketSynchronizeSchema };
export type { TSSEClientMessageModel, TRequestBody, SSEMessageModel };
