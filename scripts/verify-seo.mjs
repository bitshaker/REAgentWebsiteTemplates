import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { withoutBase } from '../src/lib/seo-policy.mjs';
import { decode, attr, tags } from './html.mjs';

const meta = (html, name) =>
  attr(
    tags(html, 'meta').find(
      (tag) => attr(tag, 'name') === name || attr(tag, 'property') === name,
    ) ?? '',
    'content',
  );
const canonicalUrl = (html) =>
  attr(
    tags(html, 'link').find((tag) => attr(tag, 'rel') === 'canonical') ?? '',
    'href',
  );
export function schemaGraph(html) {
  return [
    ...html.matchAll(
      /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    ),
  ].flatMap(([, json]) => JSON.parse(json)['@graph'] ?? []);
}

/** Inspect the actual static HTML/XML; also usable inside the export matrix. */
export async function verifySeo(
  root = process.cwd(),
  base = process.env.CATALOG_BASE || '/',
) {
  const dist = join(root, 'dist');
  const files = await readdir(dist, { recursive: true });
  const pages = new Map();
  const titles = new Set();
  const descriptions = new Set();
  for (const file of files.filter((file) => file.endsWith('.html'))) {
    const html = await readFile(join(dist, file), 'utf8');
    const label = `${root}: ${file}`;
    const canonical = canonicalUrl(html);
    assert.match(canonical, /^https?:\/\//, `${label}: absolute canonical`);
    assert.equal(
      tags(html, 'link').filter((tag) => attr(tag, 'rel') === 'canonical')
        .length,
      1,
      label,
    );
    assert.equal(
      new URL(canonical).search + new URL(canonical).hash,
      '',
      label,
    );
    const title = decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '');
    const description = meta(html, 'description');
    assert.ok(title && description, `${label}: title and description`);
    assert.equal(
      meta(html, 'og:url'),
      canonical,
      `${label}: Open Graph canonical`,
    );
    assert.equal(meta(html, 'og:title'), title, `${label}: Open Graph title`);
    assert.equal(meta(html, 'twitter:title'), title, `${label}: Twitter title`);
    assert.equal(meta(html, 'twitter:description'), description, label);
    const image = meta(html, 'og:image');
    assert.match(image, /^https?:\/\//, `${label}: absolute social image`);
    assert.ok(meta(html, 'og:image:alt'), `${label}: social image alternative`);
    assert.equal(meta(html, 'twitter:image'), image, label);
    if (new URL(image).origin === new URL(canonical).origin) {
      const path = decodeURIComponent(
        withoutBase(new URL(image).pathname, base),
      );
      await access(join(dist, path));
    }
    const hidden = meta(html, 'robots').includes('noindex');
    const graph = schemaGraph(html);
    pages.set(canonical, { hidden, html, graph });
    if (hidden) {
      assert.equal(
        graph.length,
        0,
        `${label}: no public business schema on noindex pages`,
      );
      continue;
    }
    assert.equal(tags(html, 'h1').length, 1, `${label}: one primary heading`);
    assert.ok(!titles.has(title), `${label}: unique page title`);
    assert.ok(!descriptions.has(description), `${label}: unique description`);
    titles.add(title);
    descriptions.add(description);
    for (const type of ['RealEstateAgent', 'Person', 'WebSite'])
      assert.equal(
        graph.filter((node) => node['@type'] === type).length,
        1,
        `${label}: ${type}`,
      );
    const webpage = graph.find(
      (node) => node['@id'] === `${canonical}#webpage`,
    );
    assert.equal(webpage?.url, canonical, `${label}: page schema canonical`);
    const ids = new Set(graph.map((node) => node['@id']));
    assert.equal(ids.size, graph.length, `${label}: unique entity IDs`);
    // Every @id-only reference must resolve to an entity in this graph.
    const references = (value) => {
      if (!value || typeof value !== 'object') return;
      if (Object.keys(value).length === 1 && value['@id'])
        assert.ok(
          ids.has(value['@id']),
          `${label}: unresolved ${value['@id']}`,
        );
      Object.values(value).forEach(references);
    };
    graph.forEach(references);
    const crumbs = graph.find((node) => node['@type'] === 'BreadcrumbList');
    if (file !== 'index.html') {
      assert.ok(
        crumbs && html.includes('aria-label="Breadcrumb"'),
        `${label}: visible and structured breadcrumbs`,
      );
      assert.equal(crumbs.itemListElement.at(-1).item, canonical, label);
    }
    const article = graph.find((node) => node['@type'] === 'BlogPosting');
    if (article) {
      assert.equal(meta(html, 'og:type'), 'article', label);
      assert.equal(
        article.headline,
        decode(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1].trim() ?? ''),
        label,
      );
      assert.equal(
        article.datePublished,
        meta(html, 'article:published_time'),
        label,
      );
      assert.equal(
        article.dateModified,
        meta(html, 'article:modified_time'),
        label,
      );
      assert.ok(
        new Date(article.dateModified) >= new Date(article.datePublished),
        label,
      );
    }
    // Important navigation, images and same-site links must point to real output.
    for (const tag of [...tags(html, 'a'), ...tags(html, 'img')]) {
      const href = attr(tag, tag.startsWith('<img') ? 'src' : 'href');
      if (!href || /^(?:tel:|mailto:|#)/.test(href)) continue;
      const url = new URL(href, canonical);
      if (url.origin !== new URL(canonical).origin) continue;
      const path = decodeURIComponent(withoutBase(url.pathname, base));
      await access(join(dist, path.endsWith('/') ? `${path}index.html` : path));
    }
  }
  const indexable = [...pages.entries()]
    .filter(([, page]) => !page.hidden)
    .map(([url]) => url)
    .sort();
  const sitemapFiles = files.filter((file) => /^sitemap.*\.xml$/.test(file));
  const robots = await readFile(join(dist, 'robots.txt'), 'utf8');
  assert.doesNotMatch(
    robots,
    /Disallow:\s*\//,
    'Crawlers must be able to read noindex directives.',
  );
  if (indexable.length) {
    assert.ok(
      sitemapFiles.includes('sitemap-index.xml'),
      'Sitemap index is present.',
    );
    const listed = [];
    for (const file of sitemapFiles) {
      const xml = await readFile(join(dist, file), 'utf8');
      const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) =>
        decode(url),
      );
      if (file === 'sitemap-index.xml') {
        for (const url of urls)
          await access(join(dist, withoutBase(new URL(url).pathname, base)));
      } else listed.push(...urls);
    }
    assert.deepEqual(
      listed.sort(),
      indexable,
      'Sitemaps must list exactly the canonical, indexable pages.',
    );
    const home = [...pages.keys()].find(
      (url) => withoutBase(new URL(url).pathname, base) === '/',
    );
    assert.ok(
      robots.includes(`Sitemap: ${new URL('sitemap-index.xml', home).href}`),
    );
  } else {
    assert.equal(
      sitemapFiles.length,
      0,
      'Demo/catalog builds must not advertise noindex URLs in sitemaps.',
    );
    assert.doesNotMatch(robots, /Sitemap:/);
  }
  return { pages: pages.size, indexable: indexable.length };
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  verifySeo()
    .then((result) =>
      console.log(
        `SEO checks passed: ${result.pages} pages, ${result.indexable} indexable.`,
      ),
    )
    .catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
