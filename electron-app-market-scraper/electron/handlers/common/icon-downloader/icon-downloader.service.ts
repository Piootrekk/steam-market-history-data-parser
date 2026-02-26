import { getDbInstance } from "@electron/db.config";
import { getImgIdsFromCurrentSnapshot } from "./icon-downloader.repository";
import {
  getListIconIdFromDir,
  getNewIconIds,
} from "@electron/core/domain/images-downloader/compare";
import { createDownloader } from "@electron/core/domain/images-downloader/download.factory";
import { DownloadEmitter } from "./icon-downloader.emits";

const iconDownloaderService = async (
  snapshotId: number,
  downloadEmitter?: DownloadEmitter,
) => {
  downloadEmitter?.sendStartCheckNewIcons();
  const db = getDbInstance();
  const [imagesDir, snapshotImages] = await Promise.all([
    getListIconIdFromDir(process.env.IMAGE_STORAGE_PATH),
    getImgIdsFromCurrentSnapshot(db, snapshotId),
  ]);

  const downloader = createDownloader({
    storagePath: process.env.IMAGE_STORAGE_PATH,
  });
  const newImages = getNewIconIds(snapshotImages, imagesDir);
  downloadEmitter?.sendDownloadNewIcons(newImages.length);
  const errorLogs = await downloader.saveAllIcons(newImages);
  downloadEmitter?.sendErrorLogs(errorLogs);
};

export { iconDownloaderService };
