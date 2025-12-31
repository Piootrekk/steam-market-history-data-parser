import { type ActionFunctionArgs } from "react-router-dom";

const fetchAllHistortyAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const steamId = formData.get("steamId")?.toString();
  const steamCookies = formData.get("cookies")?.toString();
  if (!steamId || !steamCookies) return { error: "Fill inputs before start" };
  isCookiesCorrect(steamCookies);
  const jobId = await window.electronAPI.startFetchingAll(
    steamId,
    steamCookies
  );
  console.log(jobId.jobId);
  console.log("asdasdasdasd");
  return {
    jobId: jobId.jobId,
  };
};

const isCookiesCorrect = (steamCookies: string) => {
  // Kiedyś parser regex'a się doda ¯\_(ツ)_/¯
};

export { fetchAllHistortyAction, isCookiesCorrect };
