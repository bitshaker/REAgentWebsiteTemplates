import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import agent from './src/agent.config.json' with { type: 'json' };
export default defineConfig({
  site: process.env.CATALOG_SITE_URL || agent.siteUrl,
  base: process.env.CATALOG_BASE || '/',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/preview/') && !page.includes('/designs/'),
    }),
  ],
});
