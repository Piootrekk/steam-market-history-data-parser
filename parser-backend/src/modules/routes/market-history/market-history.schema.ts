import { RouteShorthandOptions } from "fastify";

const healthSchema: RouteShorthandOptions = {
  schema: {
    tags: ["Collections Name"],
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
export { healthSchema };
