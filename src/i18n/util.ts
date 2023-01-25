import type enUI from "@i18n/en/ui";
import type languages from "@i18n/languages";

export type UIDictionaryKeys = keyof typeof enUI;
export type UIDict = Partial<typeof enUI>;
export type UILanguageKeys = keyof typeof languages;

/**
 * Set of right-to-left language codes.
 * https://en.wikipedia.org/wiki/Script_(Unicode)
 * @example <caption>Add right-to-left language like:</caption>
 * export const rtlLanguages = new Set<string>(['ar']);
 */
export const rtlLanguages = new Set<string>([
  /* 'العربية', Arabic */
  "ar",
  /* 'עברית', Hebrew */
  "he",
]);

/**
 * Simplified method for normalizing language tags.
 * @param tag Language tag to normalize, e.g. `pt-br` → `pt-BR`
 */

export const normalizeLangTag = function normalizeLangTag(tag: string): string {
  if (!tag.includes("-")) return tag.toLowerCase();

  const [lang, region] = tag.split("-");
  return `${(lang ?? "").toLowerCase()}-${(region ?? "").toUpperCase()}`;
};

/** Add trailing slash / to the end of string */
export const addTrailingSlash = function addTrailingSlash(path: string): string {
  return path.replace(/\/?$/u, "/");
};

export const capitalizeFirstLetter = function capitalizeFirstLetter(string: string, locale: string): string {
  return string.replace(/^\p{CWU}/u, (char) => char.toLocaleUpperCase(locale));
};
