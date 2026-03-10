import type { ValidationReturn } from "@renderer/common/types/common.types";

type ValidationSync = ValidationReturn<{
  accountId: number;
  steamCookies: string;
}>;

const getErrorValidationCheck = (
  accountId?: string,
  steamCookies?: string,
): ValidationSync => {
  if (!accountId) throw new Error("Current steamId as param not exist");
  if (!steamCookies) {
    return {
      ok: false,
      error: "Missing steamCookies",
    };
  }

  const correctCookies = isCookiesCorrect(steamCookies);
  if (!correctCookies)
    return {
      ok: false,
      error:
        "Invalid cookies pattern: steamLoginSecure=your_steamLoginSecure; sessionid=your_session_id;",
    };

  return {
    ok: true,
    accountId: Number(accountId),
    steamCookies,
  };
};

const isCookiesCorrect = (steamCookies: string): boolean => {
  const regex =
    /(steamLoginSecure=.*sessionid=.*)|(sessionid=.*steamLoginSecure=.*)/;
  return regex.test(steamCookies);
};

export { getErrorValidationCheck };
