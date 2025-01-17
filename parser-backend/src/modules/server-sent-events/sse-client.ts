import { FastifyReply } from "fastify";
import { TSSEClient } from "./sse-client.types";
import { v4 as uuidv4 } from "uuid";

const clients = new Map<string, TSSEClient>();

const addClient = (reply: FastifyReply): TSSEClient => {
  const client: TSSEClient = {
    id: uuidv4(),
    reply,
  };
  clients.set(client.id, client);
  return client;
};

const removeClient = (clientId: string): void => {
  clients.delete(clientId);
};

const sendMessage = (client: TSSEClient, message: string): void => {
  console.log(message);
  client.reply.raw.write(message);
};

const sendMessageToAll = (message: string): void => {
  clients.forEach((client) => {
    sendMessage(client, message);
  });
};

const getClient = (clientId: string): TSSEClient | undefined => {
  return clients.get(clientId);
};

const getActiveClientsCount = (): number => {
  return clients.size;
};

const sseClient = {
  addClient,
  removeClient,
  sendMessage,
  sendMessageToAll,
  getClient,
  getActiveClientsCount,
};

export default sseClient;
