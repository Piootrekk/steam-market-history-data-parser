type ValidationSync = ValidationReturn<{
  steamId: string;
  steamCookies: string;
}>;

const getErrorValidationCheck = (
  steamId?: string,
  steamCookies?: string,
): ValidationSync => {
  if (!steamId) throw new Error("Current steamId as param not exist");
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
    steamId,
    steamCookies,
  };
};

const isCookiesCorrect = (steamCookies: string): boolean => {
  const regex = new RegExp(
    "(steamLoginSecure=[^]*.*sessionid=[^]*)|(sessionid=[^]*.*steamLoginSecure=[^]*)",
  );
  return steamCookies.match(regex) !== null;
};

export { getErrorValidationCheck };
