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
];

export function specialArticle(title: string | undefined): boolean {
  if (title === undefined) {
    return false;
  }

  return SPECIAL_ARTICLE_PREFIXES.some((prefix) => title.startsWith(prefix));
}
