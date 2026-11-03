import { agent } from '../lib/agent';
export function GET() {
  return new Response(
    `User-agent: *\n${agent.demo ? 'Disallow: /' : 'Allow: /\nDisallow: /preview/\nDisallow: /designs/'}\nSitemap: ${new URL('/sitemap-index.xml', agent.siteUrl)}\n`,
    { headers: { 'Content-Type': 'text/plain' } },
  );
}
