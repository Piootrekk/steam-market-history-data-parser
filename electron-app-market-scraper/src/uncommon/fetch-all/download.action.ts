import { type ActionFunctionArgs } from "react-router-dom";
import { getErrorValidationCheck } from "./download.validation";

const fetchAllHistortyAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const steamId = formData.get("steamId")?.toString();
  const steamCookies = formData.get("cookies")?.toString();

  const val = getErrorValidationCheck(steamId, steamCookies);

  if (!val.ok) return { error: val.error };
  await window.electronAPI.startFetchingAll(val.steamId, val.steamCookies);
};

export { fetchAllHistortyAction };
