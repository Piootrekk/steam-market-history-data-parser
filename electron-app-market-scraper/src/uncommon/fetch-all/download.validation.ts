type ValidationReturn =
  | {
      ok: true;
      steamId: string;
      steamCookies: string;
    }
  | {
      ok: false;
      error: string;
    };

const getErrorValidationCheck = (
  steamId?: string,
  steamCookies?: string
): ValidationReturn => {
  if (!steamId) {
    return { ok: false, error: "Missing steamId" };
  }

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
    "(steamLoginSecure=[^;]*;.*sessionid=[^;]*;)|(sessionid=[^;]*;.*steamLoginSecure=[^;]*;)"
  );
  return steamCookies.match(regex) !== null;
};

export { getErrorValidationCheck, isCookiesCorrect };
