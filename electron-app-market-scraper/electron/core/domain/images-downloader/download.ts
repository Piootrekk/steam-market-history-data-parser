import path from "path";
import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { Readable } from "stream";
import type { ReadableStream } from "stream/web";
import { mkdir, rename, unlink } from "fs/promises";

const BASE_URL = "https://community.fastly.steamstatic.com/economy/image";
const BASE_SIZE = "64fx64f";
const MAX_SIZE = 1 * 1024 * 1024;
const CONCURRENCY_LIMIT = 30;

const STEAM_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Referer: "https://steamcommunity.com/",
};

const getAllowedExtension = (contentType: string | null) => {
  if (!contentType) return ".jpg";
  const normalized = contentType.toLowerCase().split(";")[0].trim();
  const map: Record<string, string> = {
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/webp": ".webp",
    "image/gif": ".gif",
  };
  return map[normalized] ?? undefined;
};

const setIconIdToBaseUrl = (
  imageId: string,
  baseSize: `${number}fx${number}f` = BASE_SIZE,
) => `${BASE_URL}/${imageId}/${baseSize}`;

const streamIconToFile = async (imageId: string, outputDir: string) => {
  const url = setIconIdToBaseUrl(imageId);
  const response = await fetch(url, {
    headers: STEAM_HEADERS,
    redirect: "follow",
  });

  const contentType = response.headers.get("content-type");
  const contentLength = response.headers.get("content-length");

  if (!response.ok) throw new Error(`Failed: ${imageId}: response not ok.`);
  if (!contentType?.startsWith("image/"))
    throw new Error(`Failed: ${imageId}: URL does not point to an image.`);
  if (contentLength && Number(contentLength) > MAX_SIZE)
    throw new Error(`Failed: ${imageId}: Image exceeds 1MB limit.`);
  if (!response.body) throw new Error(`Failed: ${imageId}: No response body.`);

  const ext = getAllowedExtension(contentType);
  if (!ext) throw new Error(`Failed: ${imageId}: extension not supported.`);

  const fileName = `${imageId}${ext}`;
  const outputPath = path.join(outputDir, fileName);
  const tempPath = `${outputPath}.tmp`;
  const fileStream = createWriteStream(tempPath);
  const nodeStream = Readable.fromWeb(
    response.body as ReadableStream<Uint8Array>,
  );
  try {
    await pipeline(nodeStream, fileStream);
    await rename(tempPath, outputPath);
  } catch (err) {
    await unlink(tempPath);
    throw err;
  }
};

const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

const worker = async (
  iconIds: string[],
  outputDir: string,
  getNext: () => number | null,
  logs: string[],
): Promise<void> => {
  let index: number | null;
  while ((index = getNext()) !== null) {
    const iconId = iconIds[index];
    try {
      await streamIconToFile(iconId, outputDir);
      logs[index] = `SUCCESS: downloaded ${iconId}`;
      console.log(`[${index + 1}/${iconIds.length}] Downloaded ${iconId}`);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Unknown error occurred";
      logs[index] = `ERROR: ${iconId} -> ${message}`;
      console.log(`[${index + 1}/${iconIds.length}] ERROR ${iconId}`);
    }
    await sleep(5000);
  }
};

const createIndexScheduler = (size: number) => {
  let currentIndex = 0;

  return () => (currentIndex < size ? currentIndex++ : null);
};

const getAllIcons = async (
  iconIds: string[],
  outputDir: string,
  limit = CONCURRENCY_LIMIT,
) => {
  if (limit < 1) throw new Error("Concurrency limit must be >= 1");
  const logs: string[] = [];
  await mkdir(outputDir, { recursive: true });

  const getNext = createIndexScheduler(iconIds.length);

  const workers = Array.from({ length: Math.min(limit, iconIds.length) }, () =>
    worker(iconIds, outputDir, getNext, logs),
  );

  await Promise.all(workers);
  return logs;
};

export { streamIconToFile, setIconIdToBaseUrl, getAllIcons };
