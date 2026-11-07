import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import agent from './src/agent.config.json' with { type: 'json' };
import { existsSync } from 'node:fs';
import { indexablePath, withoutBase } from './src/lib/seo-policy.mjs';
const base = process.env.CATALOG_BASE || '/';
const catalog = existsSync(
  new URL('./src/pages/designs.astro', import.meta.url),
);
export default defineConfig({
  site: process.env.CATALOG_SITE_URL || agent.siteUrl,
  base,
  output: 'static',
  trailingSlash: 'always',
  integrations:
    agent.demo || catalog
      ? []
      : [
          sitemap({
            filter: (page) =>
              indexablePath(withoutBase(new URL(page).pathname, base)),
          }),
        ],
});
