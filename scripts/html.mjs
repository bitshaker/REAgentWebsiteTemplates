/** Small parser for the static tags emitted by Astro, including quoted `>` text. */
export const decode = (text) =>
  text.replace(
    /&(?:amp|quot|apos|lt|gt|#39);/g,
    (value) =>
      ({
        '&amp;': '&',
        '&quot;': '"',
        '&apos;': "'",
        '&#39;': "'",
        '&lt;': '<',
        '&gt;': '>',
      })[value],
  );
export const attr = (tag, name) =>
  decode(tag.match(new RegExp(`(?:^|\\s)${name}="([^"]*)"`))?.[1] ?? '');
export const tags = (html, tag) =>
  [
    ...html.matchAll(new RegExp(`<${tag}\\b(?:[^>"']|"[^"]*"|'[^']*')*>`, 'g')),
  ].map(([tag]) => tag);
