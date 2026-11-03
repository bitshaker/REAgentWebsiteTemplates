import { agent } from '../lib/agent';
import { publishedPosts } from '../lib/posts';
const xml = (s: string) =>
  s.replace(
    /[<>&"']/g,
    (c) =>
      ({
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&apos;',
      })[c]!,
  );
export async function GET() {
  const posts = await publishedPosts();
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${xml(agent.brand)}</title><link>${xml(agent.siteUrl)}</link><description>${xml(agent.seoDescription)}</description>${posts.map((p) => `<item><title>${xml(p.data.title)}</title><link>${xml(new URL('/blog/' + p.id + '/', agent.siteUrl).href)}</link><guid>${xml(new URL('/blog/' + p.id + '/', agent.siteUrl).href)}</guid><description>${xml(p.data.description)}</description><pubDate>${p.data.date.toUTCString()}</pubDate></item>`).join('')}</channel></rss>`,
    { headers: { 'Content-Type': 'application/rss+xml' } },
  );
}
