import { FastifySchema } from "fastify";

const collectionsMarketNameSchema: { schema: FastifySchema } = {
  schema: {
    tags: ["Market History"],
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

const itemsPerPageSchema: { schema: FastifySchema } = {
  schema: {
    tags: ["Market History"],
    querystring: {
      type: "object",
      properties: {
        skip: {
          type: "integer",
          minimum: 0,
          default: 0,
          description: "Starting index for pagination",
        },
        limit: {
          type: "integer",
          minimum: 0,
          maximum: 100,
          default: 30,
          description: "Number of items per page",
        },
        collectionName: {
          type: "string",
          minLength: 1,
          description: "Collection name to query",
        },
        search: {
          type: "string",
          nullable: true,
          description: "Optional search term for market_hash_name",
        },
      },
      required: ["collectionName"],
    },
    response: {
      200: {
        type: "object",
        properties: {
          items: {
            type: "array",
            additionalProperties: true,
          },
        },
      },
    },
  },
};

export { collectionsMarketNameSchema, itemsPerPageSchema };
