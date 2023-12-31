export const SPECIAL_ARTICLE_PREFIXES = [
  "File:",
  "MOS:",
  "Wikipedia:",
  "Portal:",
  "WP:",
  "Template:",
  "wikt:",
  "s:",
  "iarchive:",
  "MediaWiki:",
  "Help:",
  "Draft:",
  ":commons:",
  ":d:",
  "Module:",
  "TimedText:",
  "Category:",
  "Image:",
  "DOI:",
];

export function specialArticle(title: string): boolean {
  return SPECIAL_ARTICLE_PREFIXES.some((prefix) => title.startsWith(prefix));
}
