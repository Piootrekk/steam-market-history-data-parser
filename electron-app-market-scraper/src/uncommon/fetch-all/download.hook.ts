import { useActionData, useNavigation } from "react-router-dom";
import type { fetchAllHistortyAction } from "./download.action";
import {
  useProgressEvent,
  type FetchProgress,
} from "src/common/hooks/progress.hook";

type FetchAll = {
  loading: boolean;
  error?: string;
  logs: FetchProgress[];
};

const useFetchAllHistoryAction = (): FetchAll => {
  const actionData = useActionData<typeof fetchAllHistortyAction>();
  const navigation = useNavigation();
  const { logs } = useProgressEvent();

  const loading =
    navigation.state !== "idle" && navigation.formAction ? true : false;

  return {
    loading,
    error: !loading ? actionData?.error : undefined,
    logs,
  };
};

export { useFetchAllHistoryAction };
