import path from "path";
import fs from "fs/promises";

const BASE_URL = "https://community.fastly.steamstatic.com/economy/image";
const BASE_SIZE = "64fx64f";

const STEAM_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Referer: "https://steamcommunity.com/",
};

const setIconIdToBaseUrl = (
  imageId: string,
  baseSize: `${number}fx${number}f` = BASE_SIZE,
) => {
  return `${BASE_URL}/${imageId}/${baseSize}`;
};

const getAllowedExtension = (contentType: string | null) => {
  if (!contentType) return ".jpg";
  const map: Record<string, string> = {
    png: ".png",
    jpeg: ".jpg",
    webp: ".webp",
    gif: ".gif",
  };
  for (const key in map) {
    if (contentType.includes(key)) {
      return map[key];
    }
  }
  return ".img";
};

const downloadItemIcon = async (
  url: string,
  fileName: string,
  outputDir: string,
) => {
  const response = await fetch(url, {
    headers: STEAM_HEADERS,
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const contentType = response.headers.get("content-type");

  if (!contentType?.startsWith("image/")) {
    throw new Error("URL does not point to an image");
  }

  if (!response.body) {
    throw new Error("No response body");
  }

  const ext = getAllowedExtension(contentType);
  const outputPath = path.join(outputDir, `${fileName}${ext}`);

  await fs.mkdir(outputDir, { recursive: true });

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await fs.writeFile(outputPath, buffer);
};

export { downloadItemIcon, setIconIdToBaseUrl };
