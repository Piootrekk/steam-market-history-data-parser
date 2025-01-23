import { FastifyReply } from "fastify";

type TSSEClient<T = any> = {
  id: string;
  reply: FastifyReply;
  messageType: T;
};

export type { TSSEClient };
