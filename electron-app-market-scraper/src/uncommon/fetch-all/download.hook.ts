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

const useJobId = () => {
  const [logs, setLogs] = useState<FetchProgress[]>([]);

  useEffect(() => {
    const removeListener = window.electronAPI.progressFetchingAll(
      (status, timestamp, message) => {
        setLogs((prev) => [{ status, timestamp, message }, ...prev]);
      }
    );
    return () => {
      removeListener();
    };
  }, []);

  return { logs };
};
const useFetchAllHistoryAction = (): FetchAll => {
  const actionData = useActionData<typeof fetchAllHistortyAction>();
  const navigation = useNavigation();
  const { logs } = useJobId();

  const loading = navigation.state !== "idle";

  return {
    loading,
    error: !loading ? actionData?.error : undefined,
    logs,
  };
};

export { useJobId, useFetchAllHistoryAction };
