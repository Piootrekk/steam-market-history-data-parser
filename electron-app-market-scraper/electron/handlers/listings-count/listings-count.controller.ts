import { sanitizeError } from "../../error";
import type { ValidationReturn } from "../common/common.types";
import type { ListingsCountDto } from "./listings-count.dto";
import {
  listingsCountAllService,
  listingsCountService,
} from "./listings-count.service";

const listingsCountController = async (
  _event: Electron.IpcMainInvokeEvent,
  steamId: string,
  query?: string,
): Promise<ValidationReturn<ListingsCountDto>> => {
  try {
    return await listingsCountService(steamId, query);
  } catch (err) {
    const sanitized = sanitizeError(err);
    return { ok: false, error: sanitized.message };
  }
};

const listingsCountAllController = async (
  _event: Electron.IpcMainInvokeEvent,
  query?: string,
): Promise<ValidationReturn<ListingsCountDto>> => {
  try {
    return await listingsCountAllService(query);
  } catch (err) {
    const sanitized = sanitizeError(err);
    return { ok: false, error: sanitized.message };
  }
};

export { listingsCountController, listingsCountAllController };
