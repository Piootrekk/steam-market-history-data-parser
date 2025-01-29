import { useCallback, useRef, useState } from "react";
import { errorParser } from "../utils/error-parser";

enum WebSocketState {
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3,
}

const useWebSocket = <T,>() => {
  const [connectionState, setConnectionState] = useState<WebSocketState>(
    WebSocketState.CLOSED
  );
  const [response, setResponse] = useState<T[]>([]);
  const [error, setError] = useState<string>();
  const wsRef = useRef<WebSocket | null>(null);

  const disableButton =
    connectionState === WebSocketState.OPEN ||
    connectionState === WebSocketState.CONNECTING ||
    connectionState === WebSocketState.CLOSING;

  const connect = useCallback(<G,>(url: string, sendPayload: G) => {
    if (url === undefined) return;
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

      wsRef.current.onclose = () => {
        setConnectionState(WebSocketState.CLOSED);
      };

      wsRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
      wsRef.current.onmessage = (event) => {
        try {
          const payload: T = JSON.parse(event.data);
          setResponse((prev) => [...prev, payload]);
        } catch (error) {
          const parsedError = errorParser(error);
          setError(parsedError.message);
        }
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
  };
};

export default useWebSocket;
export { WebSocketState };
