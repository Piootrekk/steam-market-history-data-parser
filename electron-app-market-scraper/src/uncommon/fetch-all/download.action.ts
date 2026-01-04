import { type ActionFunctionArgs } from "react-router-dom";

const fetchAllHistortyAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const steamId = formData.get("steamId")?.toString();
  const steamCookies = formData.get("cookies")?.toString();
  if (!steamId || !steamCookies) return { error: "Fill inputs before start" };
  const isCorrect = isCookiesCorrect(steamCookies);
  if (!isCorrect)
    return {
      error:
        "Invalid cookies pattern: steamLoginSecure=your_steamLoginSecure; sessionid=your_session_id;",
    };
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

const isCookiesCorrect = (steamCookies: string): boolean => {
  const regex = new RegExp(
    "(steamLoginSecure=[^;]*;.*sessionid=[^;]*;)|(sessionid=[^;]*;.*steamLoginSecure=[^;]*;)"
  );
  return steamCookies.match(regex) !== null;
};

export { fetchAllHistortyAction, isCookiesCorrect };
