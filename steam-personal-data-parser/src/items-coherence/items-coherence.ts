import TMarketHistoryResponse, {
  TAction,
  TAssetId,
  TVersionApi,
} from "../fetch/fetch.types";

const getGamesProps = (items: TMarketHistoryResponse) => {
  const games = Object.keys(items);
  return games;
};

const getVersion = (asset: TVersionApi): TAssetId => {
  const versions = Object.values(asset);
  return versions[0];
};

const summaryPaidAmount = (paidAmount: number, paidFee: number) => {
  return (paidAmount + paidFee) / 100;
};

const getActionInspectInGame = (actions: TAction[]): string | undefined => {
  const inspectAction = actions.find(
    (action) => action.name === "Inspect in Game..."
  );
  return inspectAction ? inspectAction.link : undefined;
};

const getActionWiki = (actions: TAction[]): string | undefined => {
  const wikiLink = actions.find(
    (action) => action.name === "Item Wiki Page..."
  );
  return wikiLink ? wikiLink.link : undefined;
};

export {
  getGamesProps,
  getVersion,
  summaryPaidAmount,
  getActionInspectInGame,
  getActionWiki,
};
