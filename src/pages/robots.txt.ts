import { sitePath, siteOrigin, isCatalog } from '../lib/site';
import { agent } from '../lib/agent';
export function GET() {
  return new Response(
    // Crawlers must be able to read noindex on demo/catalog/error pages.
    `User-agent: *\nAllow: /\n${!agent.demo && !isCatalog ? `Sitemap: ${new URL(sitePath('/sitemap-index.xml'), siteOrigin)}\n` : ''}`,
    { headers: { 'Content-Type': 'text/plain' } },
  );
}
