/** Site-relative paths only: keep crawler directives and the sitemap consistent. */
export function indexablePath(path) {
  return !/^\/(?:preview|designs|start|404|500)(?:\/|\.|$)/.test(path);
}

export function withoutBase(path, base = '/') {
  const prefix = base.replace(/\/$/, '');
  return prefix && (path === prefix || path.startsWith(prefix + '/'))
    ? path.slice(prefix.length) || '/'
    : path;
}

/** Prevent a frontmatter/config value from closing its JSON-LD script element. */
export function serializeSchema(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
