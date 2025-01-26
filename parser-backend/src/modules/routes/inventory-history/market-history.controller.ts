import { FastifyReply, FastifyRequest } from "fastify";
import CustomError from "../../../config/error-converter";
import { getInventoryHistoryCollections } from "../../db/inventory-history/inventory-history.actions";

const getCollectionsMarketName = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const db = request.server.mongo.db;
    if (!db) {
      throw new CustomError({
        message: "Invalid database connection",
        status: 500,
      });
    }
    const collectionsName = await getInventoryHistoryCollections(db);
    reply.status(200).send({ collections: collectionsName });
  } catch (error) {
    const customError = new CustomError(error);
    reply.status(500).send({ message: customError.message });
  }
};

export { getCollectionsMarketName };
