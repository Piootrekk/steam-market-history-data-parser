import type { ActionFunctionArgs } from "react-router-dom";
import { getErrorValidationCheck } from "./sync-listings.validation";

const syncFetchAction = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const steamCookies = formData.get("cookies")?.toString();
  const { accountId } = params;
  const val = getErrorValidationCheck(accountId, steamCookies);

  if (!val.ok) return { error: val.error };

  await window.electronAPI.startFetchingSync(val.steamId, val.steamCookies);
};

export { syncFetchAction };
