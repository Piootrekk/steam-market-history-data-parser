import { RouteShorthandOptions } from "fastify";

const marketSynchronizeSchema: RouteShorthandOptions = {
  schema: {
    tags: ["Market History"],
    response: {
      200: {},
    },
  },
};

const marketHistorySchema: RouteShorthandOptions = {
  schema: {
    tags: ["Market History"],
    response: {
      200: {},
    },
  },
};

export { marketHistorySchema, marketSynchronizeSchema };
