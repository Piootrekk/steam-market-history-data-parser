import { sanitizeError } from "../../error";
import { listingsCountService } from "./listings-count.service";

const listingsCountController = async (
  _event: Electron.IpcMainInvokeEvent,
  steamId: string,
): Promise<ValidationReturn<ListingsCount>> => {
  try {
    return await listingsCountService(steamId);
  } catch (err) {
    const sanitized = sanitizeError(err);
    return { ok: false, error: sanitized.message };
  }
};

export { listingsCountController };
