import { useEffect, useState } from "react";

type FetchProgress = {
  status: string;
  timestamp: number;
  message?: string;
};

const useProgressEvent = () => {
  const [logs, setLogs] = useState<FetchProgress[]>([]);

  useEffect(() => {
    const removeListener = window.electronAPI.progressFetching(
      (status, timestamp, message) => {
        setLogs((prev) => [{ status, timestamp, message }, ...prev]);
      },
    );
    return () => {
      removeListener();
    };
  }, []);
  return { logs };
};

export { useProgressEvent };
export type { FetchProgress };
