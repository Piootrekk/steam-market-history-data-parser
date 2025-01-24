import { FastifySchema } from "fastify";

const sseHealthSchema: { schema: FastifySchema } = {
  schema: {
    tags: ["SSE - Health Test"],
    response: {
      200: {
        type: "object",
        properties: {
          count: { type: "number" },
        },
      },
    },
  },
};

type SSEHeathModel = {
  count: number;
};
export type { SSEHeathModel };
export { sseHealthSchema };
