import { useActionData, useNavigation } from "react-router-dom";
import {
  useProgressEvent,
  type FetchProgress,
} from "src/common/hooks/progress.hook";
import type { syncFetchAction } from "./sync-listings.action";

type FetchAll = {
  loading: boolean;
  error?: string;
  logs: FetchProgress[];
};

const useSyncAction = (): FetchAll => {
  const actionData = useActionData<typeof syncFetchAction>();
  const navigation = useNavigation();
  const { logs } = useProgressEvent();

  const loading = navigation.state !== "idle";

  return {
    loading,
    error: !loading ? actionData?.error : undefined,
    logs,
  };
};

export { useSyncAction };
