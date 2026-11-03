import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import agent from './src/agent.config.json' with { type: 'json' };
export default defineConfig({
  site: agent.siteUrl,
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/preview/') && !page.includes('/designs/'),
    }),
  ],
});
