import { FastifyReply, FastifyRequest } from "fastify";
import { getMarketHistoryCollections } from "@modules/db/market-history/market-history.actions";
import CustomError from "@config/error-converter";

const getCollectionsMarketName = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const db = request.server.mongo.db;
    if (!db) {
      throw new CustomError({
        message: "Invalid database connection",
        statusCode: 500,
      });
    }
    const collectionsName = await getMarketHistoryCollections(db);
    reply.status(200).send({ collections: collectionsName });
  } catch (error) {
    const customError = new CustomError(error);
    reply.status(500).send({ message: customError.message });
  }
};

export { getCollectionsMarketName };
