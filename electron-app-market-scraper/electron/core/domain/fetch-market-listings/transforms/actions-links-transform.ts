import type { AssetAction } from "../fetch/raw-fetch-response.types";

type ReturnActions = {
  workshopLink?: string;
  inspectLink?: string;
  wikiLink?: string;
};

const baseWikiStart = "http://wiki";
const baseWorkshopStart = "https://steamcommunity.com/sharedfiles";
const baseInspectStart = "steam://rungame";

const getActionsLinks = (actions?: AssetAction[]): ReturnActions => {
  const result: ReturnActions = {};
  if (!actions || actions.length === 0) return result;

  for (const action of actions) {
    if (!result.inspectLink && action.link.startsWith(baseInspectStart))
      result.inspectLink = action.link;
    else if (!result.wikiLink && action.link.startsWith(baseWikiStart))
      result.wikiLink = action.link;
    else if (!result.workshopLink && action.link.startsWith(baseWorkshopStart))
      result.workshopLink = action.link;
  }
  return result;
};

export { getActionsLinks };
