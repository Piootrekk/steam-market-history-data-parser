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
  const [completedJobId, setCompletedJobId] = useState<string | null>(null);
  const prevJobId = useRef<string>(undefined);

  if (activeJobId && prevJobId.current !== activeJobId) {
    prevJobId.current = activeJobId;
    setCompletedJobId(null);
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
          setCompletedJobId(jobId);
        }
      }
    );
  }, [activeJobId]);

  const isPending = activeJobId != null && completedJobId !== activeJobId;

  return { logs, isPending };
};
const useFetchAllHistoryAction = (): FetchAll => {
  const actionData = useActionData<typeof fetchAllHistortyAction>();
  const navigation = useNavigation();
  const { logs, isPending } = useJobId(actionData?.jobId);

  const loading = navigation.state !== "idle" || isPending;

  return {
    loading,
    error: !loading ? actionData?.error : undefined,
    logs,
  };
};

export { useJobId, useFetchAllHistoryAction };
