import { type ActionFunctionArgs } from "react-router-dom";
import { getErrorValidationCheck } from "./download.validation";

const fetchAllHistortyAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const steamId = formData.get("steamId")?.toString();
  const steamCookies = formData.get("cookies")?.toString();

  const val = getErrorValidationCheck(steamId, steamCookies);

  if (!val.ok) return { error: val.error };
  const jobId = await window.electronAPI.startFetchingAll(
    val.steamId,
    val.steamCookies
  );
  console.log(jobId.jobId);
  console.log("asdasdasdasd");
  return {
    jobId: jobId.jobId,
  };
};

export { fetchAllHistortyAction };
