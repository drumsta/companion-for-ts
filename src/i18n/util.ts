import type enUI from "@i18n/en/ui";
import type languages from "@i18n/languages";
import type { AstroGlobal } from "astro";

export type UIDictionaryKeys = keyof typeof enUI;
export type UIDict = Partial<typeof enUI>;
export type UILanguageKeys = keyof typeof languages;

/**
 * Simplified method for normalizing language tags.
 * @param tag Language tag to normalize, e.g. `pt-br` → `pt-BR`
 */

export const normalizeLangTag = function normalizeLangTag(tag: string): string {
  if (!tag.includes("-")) return tag.toLowerCase();

  const [lang, region] = tag.split("-");
  return `${(lang ?? "").toLowerCase()}-${(region ?? "").toUpperCase()}`;
};

/**
 * Convert the map of modules returned by `import.meta.globEager` to an object
 * mapping the language code from each module’s filepath to the module’s default export.
 */
const mapDefaultExports = function mapDefaultExports<T>(modules: Record<string, { default: T }>): Record<string, T> {
  const exportMap: Record<string, T> = {};

  for (const [path, module] of Object.entries(modules)) {
    const [_dot, lang]: string[] = path.split("/");
    if (typeof lang !== "undefined") exportMap[lang] = module.default;
  }

  return exportMap;
};

const fallbackLang = "en";
const translations: Record<string, Partial<UIDict>> = mapDefaultExports<UIDict>(import.meta.glob("./*/ui.ts", { eager: true }));

export const useTranslationsForLang = function useTranslationsForLang(languageKey: UILanguageKeys): (key: UIDictionaryKeys) => string {
  return function getTranslation(key: UIDictionaryKeys): string {
    const value: string | undefined = translations[languageKey]?.[key] ?? translations[fallbackLang]?.[key];
    if (typeof value === "undefined") throw new Error(`Missing translation for “${key}” in “${languageKey}”.`);

    return value;
  };
};

export const getLanguageFromURL = function getLanguageFromURL(pathname: string): string {
  const langCodeMatch: RegExpExecArray | null = (/\/(?:[a-z]{2}-?[a-z]{0,2})\//u).exec(pathname);
  return langCodeMatch ? langCodeMatch[1] ?? "en" : "en";
};

/**
 * Create a helper function for getting translated strings.
 *
 * Within an Astro component, prefer the `UIString` component,
 * which only needs the key as it has access to the global Astro object.
 *
 * However, you can’t pass an Astro component as a prop to a framework component,
 * so this function creates a look-up method to get the string instead:
 *
 * @example
 * ---
 * import { useTranslations } from '~/i18n/util';
 * const t = useTranslations(Astro);
 * ---
 * <FrameworkComponent label={t('articleNav.nextPage')} />
 */
export const useTranslations = function useTranslations(Astro: Readonly<AstroGlobal>): (key: UIDictionaryKeys) => string {
  const lang: string = getLanguageFromURL(Astro.url.pathname);
  return useTranslationsForLang(lang as UILanguageKeys);
};

/** Add trailing slash / to the end of string */
export const addTrailingSlash = function addTrailingSlash(path: string): string {
  return path.replace(/\/?$/u, "/");
};

export const capitalizeFirstLetter = function capitalizeFirstLetter(string: string, locale: string): string {
  return string.replace(/^\p{CWU}/u, (char) => char.toLocaleUpperCase(locale));
};
