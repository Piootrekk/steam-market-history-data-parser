import { FastifyReply, FastifyRequest } from "fastify";

const getSynchronize = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {};

const getMarketHistory = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {};

export { getMarketHistory, getSynchronize };
