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
        collectionName: {
          type: "string",
          minLength: 1,
          description: "Collection name to query",
        },
        skip: {
          type: "integer",
          minimum: 0,
          default: 0,
          description: "Starting index for pagination",
        },
        limit: {
          type: "integer",
          minimum: 1,
          default: 30,
          description: "Number of items per page",
        },
        search: {
          type: "string",
          description: "Optional search term for market_hash_name",
        },
        actions: {
          type: "array",
          items: {
            type: "string",
            enum: ["Bought", "Cancel", "Sold", "Create"],
          },
          description: "Filter results by market actions",
        },
        games: {
          type: "array",
          items: {
            type: "string",
            enum: ["730", "252490", "440", "Others"],
          },
          description: "Filter results by game CS:GO, Rust, TF2, or Others",
        },
      },
      required: ["collectionName"],
    },
    response: {
      200: {
        type: "object",
        properties: {
          total_count: {
            type: "number",
          },
          items: {
            type: "array",
            items: {
              type: "object",
              properties: {
                _id: { type: "string" },
                event_type: { type: "integer", enum: [1, 2, 3, 4] },
                time_event: { type: "integer" },
                steamid_actor: { type: "string" },
                purchaseid: { type: "string" },
                event_action: {
                  type: "string",
                  enum: ["Bought", "Sold", "Create", "Cancel"],
                },
                listingid: { type: "string" },
                price: { type: "number" },
                currency: { type: "string" },
                item_id: { type: "string" },
                appid: { type: "integer" },
                instanceid: { type: "string" },
                original_amount: { type: "string" },
                background_color: { type: "string" },
                icon_url: { type: "string" },
                inspect_in_game_url: { type: "string" },
                name_color: { type: "string" },
                wiki_page: { type: "string" },
                market_hash_name: { type: "string" },
              },
              required: [
                "_id",
                "event_type",
                "time_event",
                "steamid_actor",
                "purchaseid",
                "event_action",
                "listingid",
                "price",
                "currency",
                "item_id",
                "appid",
                "instanceid",
                "original_amount",
                "background_color",
                "icon_url",
                "name_color",
                "market_hash_name",
              ],
            },
          },
        },
        required: ["items", "total_count"],
      },
    },
  },
};

export { collectionsMarketNameSchema, itemsPerPageSchema };
