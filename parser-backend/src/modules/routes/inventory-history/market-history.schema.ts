import { FastifySchema } from "fastify";

const inventoryHistorySchema: { schema: FastifySchema } = {
  schema: {
    tags: ["Inventory History"],
    response: {
      200: {
        type: "object",
        properties: {
          collections: {
            type: "array",
            items: { type: "string" },
          },
        },
        required: ["collections"],
      },
    },
  },
};
export { inventoryHistorySchema };
