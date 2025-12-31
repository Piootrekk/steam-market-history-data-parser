import {
  useActionData,
  useNavigation,
  type ActionFunctionArgs,
} from "react-router-dom";

type FetchAll = {
  loading: boolean;
  data?: string;
  error?: string;
};

const fetchAllHistortyAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const steamId = formData.get("steamId")?.toString();
  const steamCookies = formData.get("cookies")?.toString();
  if (!steamId || !steamCookies) return { error: "Fill inputs before start" };
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log("asdasdasdasd");
  return {
    status: "success",
  };
};

const isCookiesCorrect = (steamCookies: string) => {
  // Kiedyś parser regex się doda ¯\_(ツ)_/¯
};

const useFetchAllHistoryAction = (): FetchAll => {
  const actionData = useActionData<typeof fetchAllHistortyAction>();
  const navigation = useNavigation();
  const loading = navigation.state !== "idle";

  return {
    error: !loading ? actionData?.error : undefined,
    data: actionData?.status,
    loading,
  };
};

export { fetchAllHistortyAction, useFetchAllHistoryAction, isCookiesCorrect };
