import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, access, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createSite } from '../scripts/create-site.mjs';
import { slugify, markdown, generateArticle } from '../scripts/content.mjs';
test('exports exactly one independent design and refuses overwrites', async () => {
  const temp = await mkdtemp(join(tmpdir(), 'reagent-test-'));
  try {
    for (const theme of ['coastal', 'editorial', 'modern']) {
      const target = join(temp, theme);
      await createSite(theme, target);
      assert.equal(
        JSON.parse(
          await readFile(join(target, 'src/design/template.json'), 'utf8'),
        ).id,
        theme,
      );
      await assert.rejects(access(join(target, 'templates')));
      await assert.rejects(access(join(target, 'src/pages/preview')));
      assert.match(
        await readFile(join(target, 'src/design/Home.astro'), 'utf8'),
        /\.\.\/lib\/agent/,
      );
      assert.doesNotMatch(
        await readFile(join(target, 'src/layouts/Layout.astro'), 'utf8'),
        /href="\/designs\/"/,
      );
      await assert.rejects(createSite(theme, target), /already exists/);
    }
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
});
test('slugs stay inside the blog and generated content always starts as a draft', () => {
  assert.equal(slugify('../../Hello World!'), 'hello-world');
  assert.throws(() => slugify('!!!'));
  const doc = markdown({
    title: 'Good title',
    description: 'A sufficiently detailed description.',
    body: 'A'.repeat(110),
  });
  assert.match(doc, /draft: true/);
  assert.throws(
    () =>
      markdown({
        title: 'Good title',
        description: 'A sufficiently detailed description.',
        body: '<script>alert(1)</script>' + 'a'.repeat(110),
      }),
    /unsafe markup/,
  );
});
test('AI request validates completion and data without a live API call', async () => {
  const agent = { market: 'Sample town', content: { voice: 'Practical' } };
  const env = { AI_API_KEY: 'test-only', AI_MODEL: 'test-model' };
  const article = {
    title: 'Useful advice',
    description: 'An educational test description.',
    body: 'A'.repeat(110),
  };
  const request = async (url, options) => {
    assert.equal(url.href, 'https://api.openai.com/v1/chat/completions');
    assert.equal(JSON.parse(options.body).model, 'test-model');
    return {
      ok: true,
      json: async () => ({
        choices: [
          {
            finish_reason: 'stop',
            message: { content: JSON.stringify(article) },
          },
        ],
      }),
    };
  };
  assert.deepEqual(
    await generateArticle('Preparing to buy', agent, env, request),
    article,
  );
  await assert.rejects(
    generateArticle('topic', agent, {}, request),
    /AI_API_KEY/,
  );
  await assert.rejects(
    generateArticle('topic', agent, env, async () => ({
      ok: false,
      status: 429,
    })),
    /429/,
  );
  await assert.rejects(
    generateArticle('topic', agent, env, async () => ({
      ok: true,
      json: async () => ({ choices: [{ finish_reason: 'length' }] }),
    })),
    /incomplete/,
  );
});
