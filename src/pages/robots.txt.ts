import { sitePath, siteOrigin } from '../lib/site';
import { agent } from '../lib/agent';
export function GET() {
  return new Response(
    `User-agent: *\n${agent.demo ? 'Disallow: /' : 'Allow: /\nDisallow: /preview/\nDisallow: /designs/'}\nSitemap: ${new URL(sitePath('/sitemap-index.xml'), siteOrigin)}\n`,
    { headers: { 'Content-Type': 'text/plain' } },
  );
}
