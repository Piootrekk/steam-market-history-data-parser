const themes = {
  light: "light",
  dark: "dark",
} as const;

const getBasePrefersColorSchema = () => {
  const isDarkTheme =
    window.matchMedia &&
    window.matchMedia(`(prefers-color-scheme: ${themes.dark})`).matches;
  if (isDarkTheme) return themes.dark;
  return themes.light;
};

export { getBasePrefersColorSchema };
