import { FastifyReply } from "fastify";
import { v4 as uuidv4 } from "uuid";
import { TSSEClient } from "./sse-client.types";

const clients = new Map<string, TSSEClient<any>>();

const addClient = <T>(reply: FastifyReply): TSSEClient<T> => {
  const client: TSSEClient<T> = {
    id: uuidv4(),
    reply,
    messageType: {} as T,
  };
  clients.set(client.id, client);
  return client;
};

const removeClient = (client: TSSEClient): void => {
  client.reply.raw.write(`${JSON.stringify({ success: true })}`);
  client.reply.raw.end();
  clients.delete(client.id);
};

const setErrorMessage = (client: TSSEClient, message: string): void => {
  client.reply.raw.write(JSON.stringify({ message: message }));
  client.reply.raw.end();
};

const sendMessage = <T>(client: TSSEClient<T>, message: T): void => {
  const serializedMessage = JSON.stringify(message);
  console.log(serializedMessage);
  client.reply.raw.write(serializedMessage + "\n");
};

const getClient = <T>(clientId: string): TSSEClient<T> | undefined => {
  return clients.get(clientId) as TSSEClient<T>;
};

const getActiveClientsCount = (): number => {
  return clients.size;
};

const sseClient = {
  addClient,
  removeClient,
  sendMessage,
  setErrorMessage,
  getClient,
  getActiveClientsCount,
};

export default sseClient;
