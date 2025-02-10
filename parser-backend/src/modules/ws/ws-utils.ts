import CustomError from "@/config/error-converter";
import { TErrorPayload } from "./ws.types";
import { WebSocket } from "ws";

const closeDirectives = {
  NORMAL_CLOSE: 1000,
  CLIENT_DISCONNECTED: 1001,
  PROTOCOL_ERROR: 1002,
};

const handleCloseWsConnection = (code: number, reason?: string) => {
  if (code === closeDirectives.NORMAL_CLOSE) {
    console.log("Ws connection close by server");
  } else if (code === closeDirectives.CLIENT_DISCONNECTED) {
    console.error("Client terrminated the ws connection");
    throw new CustomError({
      customError: { message: "Client terrminated the ws connection" },
    });
  } else if (code === closeDirectives.PROTOCOL_ERROR) {
    console.error(
      `Closed by custom server or unexpected issue: Code ${code}, Reason: ${reason}`
    );
    throw new CustomError({
      customError: {
        message: `Closed by custom server or unexpected issue: Code ${code}, Reason: ${reason}`,
      },
    });
  } else {
    console.error(
      `Closed by unexpected issue: Code ${code}, Reason: ${reason}`
    );
    throw new CustomError({
      customError: {
        message: `Closed by unexpected issue: Code ${code}, Reason: ${reason}`,
      },
    });
  }
};

const wsCloseCorrectly = (connection: WebSocket, message: string) => {
  const closePayload: TErrorPayload = {
    type: "close",
    message: message,
  };
  connection.close(closeDirectives.NORMAL_CLOSE, JSON.stringify(closePayload));
};

const wsCloseByError = (connection: WebSocket, message: string) => {
  const errorPayload: TErrorPayload = {
    type: "error",
    message: message,
  };
  connection.close(
    closeDirectives.PROTOCOL_ERROR,
    JSON.stringify(errorPayload)
  );
};

export { handleCloseWsConnection, wsCloseByError, wsCloseCorrectly };
