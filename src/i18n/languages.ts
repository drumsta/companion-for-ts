/**
 * Map of language codes to a written out language name.
 * Used to populate the language switcher.
 */
export default {
  en: "English",
  lt: "Lietuvių",
};

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
