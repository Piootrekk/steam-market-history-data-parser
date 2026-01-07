import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!activeJobId) return;
    const removeListener = window.electronAPI.progressFetchingAll(
      (jobId, status, timestamp, message) => {
        setLogs((prev) => [{ jobId, status, timestamp, message }, ...prev]);
        if (status === "finish") {
          setCompletedJobId(jobId);
        }
      }
    );
    return () => {
      removeListener();
    };
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
