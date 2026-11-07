import { readdir, readFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import assert from 'node:assert/strict';
import { designIds } from './catalog.mjs';
const catalog = JSON.parse(await readFile('src/catalog.config.json', 'utf8'));
const base = (process.env.CATALOG_BASE || '/').replace(/\/$/, '');
const origin = process.env.CATALOG_SITE_URL || 'https://example.com';
const files = await readdir('dist', { recursive: true });
let count = 0;
for (const file of files.filter((file) => file.endsWith('.html'))) {
  const html = await readFile(join('dist', file), 'utf8');
  assert.doesNotMatch(
    html,
    /https:\/\/example.com\/(?:REAgentWebsiteTemplates\/)?(?:preview|start|designs)/,
  );
  for (const match of html.matchAll(
    /\b(?:href|src|poster|data-src)="([^"]+)"/g,
  )) {
    const value = match[1].replaceAll('&amp;', '&');
    if (!value.startsWith('/') || value.startsWith('//')) continue;
    assert.ok(
      !base || value.startsWith(base + '/'),
      `${file}: missing base in ${value}`,
    );
    const path = decodeURIComponent(
      new URL(value, origin).pathname.slice(base.length),
    );
    const target = join('dist', path, path.endsWith('/') ? 'index.html' : '');
    await access(target).catch(() => {
      throw new Error(`${file}: missing local target ${value}`);
    });
    count++;
  }
}
for (const id of await designIds()) {
  await access(`dist/downloads/${id}.zip`);
  const setup = await readFile(`dist/start/${id}/index.html`, 'utf8');
  assert.ok(setup.includes(`${base}/downloads/${id}.zip`));
  assert.ok(setup.includes(catalog.hostingerCode));
  assert.ok(setup.includes(catalog.grokBotUrl || 'Coming soon'));
  for (const page of ['', 'buyers/', 'sellers/', 'about/', 'blog/', 'contact/'])
    await access(`dist/preview/${id}/${page}index.html`);
}
console.log(
  `Verified ${count} local links/assets, all design previews, setup pages and starter downloads.`,
);
