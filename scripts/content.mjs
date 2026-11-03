import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';
export const articleSchema = z.object({
  title: z.string().min(5).max(150),
  description: z.string().min(15).max(300),
  body: z.string().min(100).max(30000),
});
export function slugify(input) {
  const slug = input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
    .replace(/-$/, '');
  if (!slug) throw new Error('Topic must contain letters or numbers.');
  return slug;
}
export function markdown(article, date = new Date()) {
  const a = articleSchema.parse(article);
  if (/<\/?[a-z][^>]*>|javascript:|data:text\/html/i.test(a.body))
    throw new Error(
      'Generated article contains unsafe markup. Review it outside the website.',
    );
  return `---\ntitle: ${JSON.stringify(a.title)}\ndescription: ${JSON.stringify(a.description)}\ndate: ${date.toISOString().slice(0, 10)}\ndraft: true\n---\n\n${a.body}\n`;
}
export async function generateArticle(
  topic,
  agent,
  env = process.env,
  request = fetch,
) {
  if (!env.AI_API_KEY || !env.AI_MODEL)
    throw new Error(
      'Set AI_API_KEY and AI_MODEL, or ask your software agent to write a Markdown draft.',
    );
  const base = new URL(env.AI_BASE_URL || 'https://api.openai.com/v1/');
  if (base.protocol !== 'https:')
    throw new Error('AI_BASE_URL must use HTTPS.');
  if (!base.pathname.endsWith('/')) base.pathname += '/';
  const response = await request(new URL('chat/completions', base), {
    method: 'POST',
    signal: AbortSignal.timeout(90000),
    headers: {
      Authorization: `Bearer ${env.AI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: env.AI_MODEL,
      messages: [
        {
          role: 'system',
          content:
            'Write educational real estate content as plain Markdown with no HTML, scripts, or raw embeds. Return JSON containing title, description, body. Never invent listings, statistics, market trends, laws, testimonials, credentials, or sources. Do not steer readers based on protected characteristics or make demographic judgments about neighborhoods. Avoid legal, tax, or financing prescriptions. Use supplied facts only and clearly mark anything requiring local verification. No guaranteed outcomes. Do not claim to have researched current facts.',
        },
        {
          role: 'user',
          content: JSON.stringify({
            topic,
            market: agent.market,
            voice: agent.content.voice,
          }),
        },
      ],
      response_format: { type: 'json_object' },
      max_completion_tokens: 3500,
    }),
  });
  if (!response.ok)
    throw new Error(
      `AI request failed (${response.status}); check your provider settings and quota.`,
    );
  const data = await response.json();
  const choice = data.choices?.[0];
  if (choice?.finish_reason !== 'stop')
    throw new Error('Generation incomplete or refused. No draft was saved.');
  return articleSchema.parse(JSON.parse(choice.message.content));
}
export async function main(args = process.argv.slice(2)) {
  const [action, ...rest] = args;
  const agent = JSON.parse(await readFile('src/agent.config.json', 'utf8'));
  await mkdir('src/content/blog', { recursive: true });
  if (action === 'publish') {
    const slug = rest[0];
    if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
      throw new Error('Supply the draft slug only.');
    const file = `src/content/blog/${slug}.md`;
    const source = await readFile(file, 'utf8');
    const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
    if (!match || !/^draft: true\r?$/m.test(match[1]))
      throw new Error('Expected a Markdown draft with draft: true.');
    const updated = source.replace(
      match[0],
      match[0].replace(/^draft: true\r?$/m, 'draft: false'),
    );
    await writeFile(file, updated);
    console.log(
      `Published ${slug}; rebuild and deploy to update the live site.`,
    );
    return;
  }
  if (!['new', 'generate'].includes(action))
    throw new Error('Use new TOPIC, generate TOPIC, or publish SLUG.');
  const topic = rest.join(' ').trim();
  if (!topic) throw new Error('Supply a topic.');
  const slug = slugify(topic);
  const article =
    action === 'generate'
      ? await generateArticle(topic, agent)
      : {
          title: topic,
          description: `A practical guide to ${topic.toLowerCase()}.`,
          body: '## Start here\n\nWrite your educational article here. Confirm all local facts, remove unsupported claims, and review the final copy before publication.',
        };
  await writeFile(`src/content/blog/${slug}.md`, markdown(article), {
    flag: 'wx',
  });
  console.log(
    `Draft saved: src/content/blog/${slug}.md. Review before content:publish.`,
  );
}
if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  main().catch((e) => {
    console.error(
      e.code === 'EEXIST'
        ? 'That draft already exists; choose another topic.'
        : e.message,
    );
    process.exitCode = 1;
  });
