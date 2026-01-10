import { randomUUID } from "crypto";

const fetchAllController = async (
  event: Electron.IpcMainInvokeEvent,
  steamid: string,
  cookies: string
) => {
  const jobId = randomUUID();
  const webContents = event.sender;
  progressAllController(webContents, jobId, steamid, cookies);
  return { jobId };
};

const progressAllController = (
  webContents: Electron.WebContents,
  jobId: string,
  steamid: string,
  cookies: string
) => {
  try {
  } catch (err) {}
};

export { fetchAllController };
