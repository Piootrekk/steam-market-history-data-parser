import { FastifyReply } from "fastify";

type TSSEClient = {
  id: string;
  reply: FastifyReply;
};

export type { TSSEClient };
