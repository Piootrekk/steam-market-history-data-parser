import path from "path";
import fs from "fs/promises";

const ALLOWED_EXTENSIONS = [".png", ".gif", ".webp", ".jpg"];

const appImagesHandler = async (request: Request): Promise<Response> => {
  const url = new URL(request.url);
  const fileName = url.host;
  const basePath = process.env.IMAGE_STORAGE_PATH;

  if (fileName.includes("..")) {
    return new Response("Forbidden", { status: 403 });
  }

  for (const ext of ALLOWED_EXTENSIONS) {
    try {
      const filePath = path.join(basePath, `${fileName}${ext}`);
      await fs.access(filePath, fs.constants.F_OK);
      const data = await fs.readFile(filePath);

      return new Response(data, {
        headers: {
          "Content-Type": getMimeType(ext),
          "Cache-Control": "public, max-age=31536000",
        },
      });
    } catch {}
  }
  return new Response("Not found", { status: 404 });
};

const getMimeType = (ext: string) => {
  switch (ext) {
    case ".png":
      return "image/png";
    case ".webp":
      return "image/webp";
    case ".jpg":
      return "image/jpeg";
    case ".gif":
      return "image/gif";
    default:
      return "application/octet-stream";
  }
};

export { appImagesHandler };
