/** Prefix public paths once; Astro already prefixes imported asset URLs. */
export function sitePath(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (
    !path.startsWith('/') ||
    path.startsWith('//') ||
    !base ||
    path === base ||
    path.startsWith(base + '/')
  )
    return path;
  return base + path;
}
export const siteOrigin = import.meta.env.SITE || 'https://example.com';
