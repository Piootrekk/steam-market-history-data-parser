import { FastifyReply, FastifyRequest } from "fastify";

const getHealth = async (request: FastifyRequest, reply: FastifyReply) => {
  reply.send({ health: true });
};

export { getHealth };
