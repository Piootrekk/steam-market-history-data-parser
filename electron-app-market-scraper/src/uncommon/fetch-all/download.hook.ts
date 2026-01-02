import { useEffect, useRef, useState } from "react";
import type { FetchProgress } from "./progress.types";
import { useActionData, useNavigation } from "react-router-dom";
import type { fetchAllHistortyAction } from "./download.action";

type FetchAll = {
  loading: boolean;
  data?: string;
  error?: string;
  logs: FetchProgress[];
};

const useJobId = (activeJobId?: string) => {
  const [logs, setLogs] = useState<FetchProgress[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const prevJobId = useRef<string>(undefined);

  if (activeJobId && prevJobId.current !== activeJobId) {
    prevJobId.current = activeJobId;
    setIsPending(true);
    setIsDone(false);
  }

  useEffect(() => {
    if (!activeJobId) return;

    window.electronAPI.progressFetchingAll(
      (jobId, current, total, status, timestamp, message) => {
        if (jobId !== activeJobId) return;

        setLogs((prev) => [
          ...prev,
          { current, jobId, total, status, timestamp, message },
        ]);

        if (status === "done" || current === total) {
          setIsPending(false);
          setIsDone(true);
        }
      }
    );
  }, [activeJobId]);

  return { logs, isPending, isDone };
};
const useFetchAllHistoryAction = (): FetchAll => {
  const actionData = useActionData<typeof fetchAllHistortyAction>();
  const [manualLoading, setManualLoading] = useState(false);
  const navigation = useNavigation();
  const { logs, isPending, isDone } = useJobId(actionData?.jobId);

  useEffect(() => {
    console.log(`Pending states:`, {
      nav: navigation.state,
      progress: isPending,
      sync: manualLoading,
    });
    if (navigation.state !== "idle" && manualLoading === false)
      setManualLoading(true);
    if (manualLoading === true && isDone) setManualLoading(false);
  }, [navigation.state, isPending]);

  return {
    loading: manualLoading,
    error: actionData?.error,
    logs,
  };
};

export { useJobId, useFetchAllHistoryAction };
