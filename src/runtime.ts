export {};

const systemTheme = "system";
const fallbackTheme = "dark";
const knownColorSchemes = ["dark", "light"];
let savedPreference = systemTheme;
let lastTheme = systemTheme;

const getSavedPreference = function getSavedPreference(): string {
  try {
    return localStorage.getItem("app/dark-mode") ?? systemTheme;
  } catch (e) {
    // LocalStorage may not be accessible.
  }

  return systemTheme;
};

const getMediaQueryList = function getMediaQueryList(suffix: string): MediaQueryList {
  return window.matchMedia(`(prefers-color-scheme${suffix})`);
};

const getSystemPreference = function getSystemPreference(): string {
  if (getMediaQueryList("").media !== "not all")
    for (const colorScheme of knownColorSchemes) if (getMediaQueryList(`:${colorScheme}`).matches) return colorScheme;

  return fallbackTheme;
};

const initThemeMode = function initThemeMode(): void {
  savedPreference = getSavedPreference();
  const theme = savedPreference === systemTheme ? getSystemPreference() : savedPreference;
  const de = document.documentElement;
  if (lastTheme !== systemTheme) de.classList.remove(lastTheme);
  if (lastTheme !== fallbackTheme) de.classList.remove(fallbackTheme);
  de.classList.add(theme);
  lastTheme = theme;
};

const onChangeMedia = function onChangeMedia(): void {
  initThemeMode();
};

window.onload = (): void => {
  initThemeMode();

  if (savedPreference === systemTheme) {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", onChangeMedia, { passive: true });
  }
};
