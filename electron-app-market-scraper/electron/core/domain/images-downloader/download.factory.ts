import path from "path";
import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { Readable } from "stream";
import type { ReadableStream } from "stream/web";
import { rename, unlink } from "fs/promises";

type IconDownloaderConfig = {
  storagePath: string;
  baseUrl?: string;
  baseSize?: `${number}fx${number}f`;
  maxSize?: number;
  concurrencyLimit?: number;
};

type Icon = {
  urlIcon: string;
  iconHashStorage: string;
};

const STEAM_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Referer: "https://steamcommunity.com/",
};

const BASE_CONFIG = {
  baseUrl: "https://community.fastly.steamstatic.com/economy/image",
  baseSize: "64fx64f",
  maxSize: 1 * 1024 * 1024,
  concurrencyLimit: 30,
} satisfies Omit<IconDownloaderConfig, "storagePath">;

const createDownloader = ({
  baseUrl = BASE_CONFIG.baseUrl,
  baseSize = BASE_CONFIG.baseSize,
  maxSize = BASE_CONFIG.maxSize,
  concurrencyLimit = BASE_CONFIG.concurrencyLimit,
  storagePath,
}: IconDownloaderConfig) => {
  const getAllowedExtension = (contentType: string) => {
    const normalized = contentType.toLowerCase().split(";")[0].trim();
    const map: Record<string, string> = {
      "image/png": ".png",
      "image/gif": ".gif",
      "image/webp": ".webp",
      "image/jpeg": ".jpg",
    };
    return map[normalized] ?? undefined;
  };

  const buildUrl = (imageId: string) => `${baseUrl}/${imageId}/${baseSize}`;

  const streamIconToFile = async (imageId: string, imageName: string) => {
    const response = await fetch(buildUrl(imageId), {
      headers: STEAM_HEADERS,
      redirect: "follow",
    });

    if (!response.ok) throw new Error(`Failed: ${imageId}: response not ok.`);

    const contentType = response.headers.get("content-type");
    const contentLength = response.headers.get("content-length");

    if (!contentType?.startsWith("image/"))
      throw new Error(`Failed: ${imageId}: URL does not point to an image.`);

    if (contentLength && Number(contentLength) > maxSize)
      throw new Error(`Failed: ${imageId}: Image exceeds limit.`);

    if (!response.body)
      throw new Error(`Failed: ${imageId}: No response body.`);

    const ext = getAllowedExtension(contentType);
    if (!ext) throw new Error(`Failed: ${imageId}: extension not supported.`);

    const fileName = `${imageName}${ext}`;
    const outputPath = path.join(storagePath, fileName);
    const tempPath = `${outputPath}.tmp`;

    const nodeStream = Readable.fromWeb(
      response.body as ReadableStream<Uint8Array>,
    );

    try {
      await pipeline(nodeStream, createWriteStream(tempPath));
      await rename(tempPath, outputPath);
    } catch (err) {
      await unlink(tempPath);
      throw err;
    }
  };

  const worker = async (iterator: Iterator<[number, Icon]>) => {
    const localLogs: string[] = [];
    while (true) {
      const next = iterator.next();
      if (next.done) break;
      const [index, { urlIcon, iconHashStorage }] = next.value;
      try {
        await streamIconToFile(urlIcon, iconHashStorage);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        localLogs.push(
          `Error: ${message}, Index: ${index}, Url: ${urlIcon}, Hash: ${iconHashStorage}`,
        );
      }
    }
    return localLogs;
  };
  const saveAllIcons = async (icons: Icon[]) => {
    if (concurrencyLimit < 1) {
      throw new Error("Concurrency limit must be >= 1");
    }
    const iterator = icons.entries();

    const workers = Array.from(
      { length: Math.min(concurrencyLimit, icons.length) },
      () => worker(iterator),
    );
    const logs = await Promise.all(workers);

    return logs.flat();
  };
  return {
    saveAllIcons,
  };
};

export { createDownloader };
