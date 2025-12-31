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
  const [isPending, setIsPending] = useState<boolean>(false);
  useEffect(() => {
    if (!activeJobId) return;
    setIsPending(true);
    window.electronAPI.progressFetchingAll(
      (jobId, current, total, status, timestamp, message) => {
        if (jobId !== activeJobId) return;
        console.log("FETCH ", { current, total, status, timestamp, message });
        setLogs((perv) => [
          ...perv,
          { current, jobId, total, status, timestamp, message },
        ]);
        if (status === "done" || current === total) {
          setIsPending(false);
        }
      }
    );
    return () => {
      setIsPending(false);
    };
  }, [activeJobId]);
  return { logs, isPending };
};

const useFetchAllHistoryAction = (): FetchAll => {
  const actionData = useActionData<typeof fetchAllHistortyAction>();
  const { isPending, logs } = useJobId(actionData?.jobId);
  const navigation = useNavigation();
  const loadingForm = navigation.state !== "idle";
  const loading = loadingForm || isPending;
  return {
    error: !loadingForm ? actionData?.error : undefined,
    loading,
    logs,
  };
};

export { useJobId, useFetchAllHistoryAction };
