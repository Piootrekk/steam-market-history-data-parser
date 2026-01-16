import { sanitizeError } from "../../error";
import { listingsCountService } from "./listings-count.service";

const listingsCountController = async (
  _event: Electron.IpcMainInvokeEvent,
  steamId: string,
  limit: number
): Promise<ValidationReturn<ListingsCount>> => {
  try {
    return await listingsCountService(steamId, limit);
  } catch (err) {
    const sanitized = sanitizeError(err);
    return { ok: false, error: sanitized.message };
  }
};

export { listingsCountController };
