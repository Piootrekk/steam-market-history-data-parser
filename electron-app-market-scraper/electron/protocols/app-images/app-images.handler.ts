import path from "path";
import fs from "fs/promises";

const appImagesHandler = async (request: Request): Promise<Response> => {
  const url = new URL(request.url);
  const fileName = url.host;
  if (fileName.includes("..")) {
    return new Response("Forbidden", { status: 403 });
  }
  const filePath = path.join(process.env.IMAGE_STORAGE_PATH, fileName);
  try {
    const data = await fs.readFile(filePath);
    return new Response(data);
  } catch {
    return new Response("Not found", { status: 404 });
  }
};

export { appImagesHandler };
