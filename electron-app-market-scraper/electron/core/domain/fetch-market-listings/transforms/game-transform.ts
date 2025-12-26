const APPS: Record<string, string> = {
  "440": "TF2",
  "730": "CS2",
  "252490": "RUST",
  "570": "DOTA2",
  "322330": "DST",
  "304930": "UNT",
} as const;

const getGameFromAppId = (appId: number | `${number}`) => {
  const appIdStringify = appId.toString();
  const baseApp = Object.keys(APPS);
  const matchGame = baseApp.find((game) => game === appIdStringify);
  if (matchGame) return APPS[matchGame];
  else return "Others";
};

export { getGameFromAppId };
