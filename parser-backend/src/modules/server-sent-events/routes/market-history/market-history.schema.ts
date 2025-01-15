import { FastifySchema } from "fastify";

const marketSynchronizeSchema: { schema: FastifySchema } = {
  schema: {
    tags: ["Market History"],
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
    tags: ["Market History"],
    body: {
      type: "object",
      required: ["steamid"],
      properties: {
        steamid: { type: "string" },
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

export { marketHistorySchema, marketSynchronizeSchema };
