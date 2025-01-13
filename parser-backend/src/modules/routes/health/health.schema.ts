import { RouteShorthandOptions } from "fastify";

const healthSchema: RouteShorthandOptions = {
  schema: {
    tags: ["Health"],
    response: {
      200: {
        type: "object",
        properties: {
          health: { type: "boolean" },
        },
        required: ["health"],
      },
    },
  },
};

export { healthSchema };
