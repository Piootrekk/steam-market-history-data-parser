import { ipcWebContentsAdapter } from "../../ipc-adapter/ipc.main.adapter";
import { getCommonProgressEmits } from "../common/send-progress.emits";

type ProgressEmitter = ReturnType<typeof getProgressEmitter>;

const getProgressEmitter = (webContents: Electron.WebContents) => {
  return {
    ...getCommonProgressEmits(webContents),
    nothingChanges: (listingsLength: number, fetchLength: number) =>
      nothingChanges(webContents, listingsLength, fetchLength),
    newLitsings: (diffListings: number) =>
      newLitsings(webContents, diffListings),
  };
};

const nothingChanges = (
  webContents: Electron.WebContents,
  dbLength: number,
  fetchLength: number,
) => {
  const dateNow = Date.now();
  ipcWebContentsAdapter.send(
    webContents,
    "fetch:progress",
    "success",
    dateNow,
    `Already synchronized ${dbLength}/${fetchLength} listings.`,
  );
};

const newLitsings = (
  webContents: Electron.WebContents,
  diffListings: number,
) => {
  const dateNow = Date.now();
  ipcWebContentsAdapter.send(
    webContents,
    "fetch:progress",
    "success",
    dateNow,
    `New listings appeared ${diffListings} listings.`,
  );
};

export { getProgressEmitter };
export type { ProgressEmitter };
