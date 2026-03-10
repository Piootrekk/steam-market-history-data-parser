import { createHash } from "node:crypto";

const hashUrlIconToFileName = (urlIcon: string) => {
  return createHash("sha256").update(urlIcon).digest("hex").slice(0, 16);
};

export { hashUrlIconToFileName };
