export type TWsSendToServer = {
  cookies: string;
  steamid: string;
};

export type TWsRecievedFromServer = {
  currentFetch: number;
  allFetches: number;
};
