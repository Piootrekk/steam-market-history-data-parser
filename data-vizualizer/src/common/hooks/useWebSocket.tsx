import { useCallback, useRef, useState } from "react";
import { errorParser } from "../utils/error-parser";

enum WebSocketState {
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3,
}

type TClosePayload = {
  type: "error" | "close";
  message: string;
};

const useWebSocket = <T,>() => {
  const [connectionState, setConnectionState] = useState<WebSocketState>(
    WebSocketState.CLOSED
  );
  const [response, setResponse] = useState<T | undefined>(undefined);
  const [error, setError] = useState<string>();
  const [closeMessage, setCloseMessage] = useState<string | undefined>(
    undefined
  );
  const wsRef = useRef<WebSocket | null>(null);

  const disableButton =
    connectionState === WebSocketState.OPEN ||
    connectionState === WebSocketState.CONNECTING ||
    connectionState === WebSocketState.CLOSING;

  const connect = useCallback(<G,>(url: string, sendPayload: G) => {
    if (wsRef.current?.readyState === WebSocketState.OPEN) {
      setError("Connection is already open");
      return;
    }
    try {
      wsRef.current = new WebSocket(url);
      setConnectionState(WebSocketState.CONNECTING);

      wsRef.current.onopen = () => {
        setConnectionState(WebSocketState.OPEN);

        if (wsRef.current?.readyState === WebSocketState.OPEN) {
          wsRef.current.send(JSON.stringify(sendPayload));
        }
      };

      wsRef.current.onclose = (eventClose) => {
        setConnectionState(WebSocketState.CLOSED);
        const closeMessage: TClosePayload = JSON.parse(eventClose.reason);
        if (closeMessage.type === "error") {
          setResponse(undefined);
          setError(closeMessage.message);
        } else {
          setCloseMessage(closeMessage.message);
        }
      };

      wsRef.current.onmessage = (event) => {
        try {
          const payload: T = JSON.parse(event.data);
          setResponse(payload);
        } catch (error) {
          const parsedError = errorParser(error);
          setError(parsedError.message);
        }
      };
      wsRef.current.onerror = () => {
        setError("Failed to establish connection with websocket");
      };
    } catch (error) {
      const parsedError = errorParser(error);
      setError(parsedError.message);
    } finally {
      setConnectionState(WebSocketState.CLOSED);
    }
  }, []);

  return {
    connectionState,
    connect,
    response,
    error,
    disableButton,
    closeMessage,
  };
};

export default useWebSocket;
export { WebSocketState };
