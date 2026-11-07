import { designIds } from '../scripts/catalog.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, readdir, access, rm } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createSite } from '../scripts/create-site.mjs';
import { slugify, markdown, generateArticle } from '../scripts/content.mjs';
const exec = promisify(execFile);

const ownerFiles = [
  'README.md',
  'AGENTS.md',
  'LICENSE',
  '.gitignore',
  '.env.example',
  '.nvmrc',
  'package.json',
  'package-lock.json',
  'astro.config.mjs',
  'tsconfig.json',
  'src/agent.config.json',
  'src/content.config.ts',
  'src/content/blog/preparing-for-your-next-move.md',
  'src/design/Home.astro',
  'src/design/pages.ts',
  'src/design/theme.css',
  'src/design/template.json',
  'src/design/media/CREDITS.md',
  'src/selected-template.ts',
  'src/layouts/Layout.astro',
  'src/env.d.ts',
  'src/lib/media.ts',
  'src/lib/portrait.ts',
  'src/lib/film-playback.mjs',
  'src/lib/seo.ts',
  'src/lib/seo-policy.mjs',
  'src/styles/fonts.css',
  'src/assets/fonts/collection-0.woff2',
  'src/assets/fonts/Cormorant-Garamond-LICENSE.txt',
  ...[
    'index',
    'buyers',
    'sellers',
    'about',
    'contact',
    'privacy',
    'accessibility',
    '404',
  ].map((page) => `src/pages/${page}.astro`),
  'src/pages/blog/index.astro',
  'src/pages/blog/[...slug].astro',
  'src/pages/rss.xml.ts',
  'src/pages/robots.txt.ts',
  'public/images/social-card.png',
  'scripts/content.mjs',
  'scripts/verify-launch.mjs',
  'scripts/verify-seo.mjs',
  'scripts/verify-quality.mjs',
  'scripts/html.mjs',
  '.github/workflows/ci.yml',
  'docs/examples/content-draft.yml',
  ...[
    'OWNER-GUIDE',
    'AGENT-SETUP',
    'PERSONALIZATION',
    'HOSTINGER',
    'CONTENT',
    'LAUNCH-CHECKLIST',
    'SEO',
    'OPTIMIZATION',
  ].map((guide) => `docs/${guide}.md`),
];

test('exports exactly one independent design and refuses overwrites', async () => {
  const temp = await mkdtemp(join(tmpdir(), 'reagent-test-'));
  try {
    for (const theme of await designIds()) {
      const target = join(temp, theme);
      await createSite(theme, target);
      assert.equal(
        JSON.parse(
          await readFile(join(target, 'src/design/template.json'), 'utf8'),
        ).id,
        theme,
      );
      await assert.rejects(access(join(target, 'templates')));
      for (const file of [
        '.git',
        'node_modules',
        '.env',
        '.hostinger',
        'dist',
        'tests',
        'catalog-previews',
        'src/pages/start',
        'src/catalog.config.json',
        'src/lib/onboarding.ts',
        'src/components/CatalogSetup.astro',
        '.github/workflows/pages.yml',
        '.github/workflows/content-draft.yml',
        '.github/owner-workflows',
        'scripts/package-catalog.mjs',
        'scripts/create-site.mjs',
        'scripts/catalog.mjs',
        'scripts/verify-catalog.mjs',
      ])
        await assert.rejects(access(join(target, file)));
      assert.match(
        await readFile(join(target, 'src/pages/index.astro'), 'utf8'),
        /<Home/,
      );
      assert.doesNotMatch(
        await readFile(join(target, 'src/layouts/Layout.astro'), 'utf8'),
        /CatalogLinks/,
      );
      await assert.rejects(access(join(target, 'src/design/preview.jpg')));
      await assert.rejects(access(join(target, 'src/pages/preview')));
      assert.match(
        await readFile(join(target, 'src/design/Home.astro'), 'utf8'),
        /\.\.\/lib\/agent/,
      );
      assert.doesNotMatch(
        await readFile(join(target, 'src/layouts/Layout.astro'), 'utf8'),
        /href="\/designs\/"/,
      );
      for (const file of ownerFiles) await access(join(target, file));
      // Every design's source media and attribution must survive the export.
      const sourceMedia = new URL(
        `../templates/${theme}/media/`,
        import.meta.url,
      );
      for (const file of await readdir(sourceMedia))
        assert.deepEqual(
          await readFile(join(target, 'src/design/media', file)),
          await readFile(new URL(file, sourceMedia)),
        );
      const pkg = JSON.parse(
        await readFile(join(target, 'package.json'), 'utf8'),
      );
      assert.deepEqual(await readdir(join(target, '.github/workflows')), [
        'ci.yml',
      ]);
      const workflow = await readFile(
        join(target, '.github/workflows/ci.yml'),
        'utf8',
      );
      assert.doesNotMatch(
        workflow,
        /test:exports|build:catalog|verify:catalog|npm run test|schedule:|deploy-pages|configure-pages|pages: write|id-token: write/,
      );
      assert.match(workflow, /contents: read/);
      assert.match(workflow, /actions\/upload-artifact@/);
      for (const [, command] of workflow.matchAll(/- run: npm run ([\w:]+)/g))
        assert.equal(
          typeof pkg.scripts[command],
          'string',
          `${theme}: CI calls missing ${command}`,
        );
      assert.equal(
        await readFile(join(target, 'docs/examples/content-draft.yml'), 'utf8'),
        await readFile(
          new URL('../.github/workflows/content-draft.yml', import.meta.url),
          'utf8',
        ),
      );
      const lock = JSON.parse(
        await readFile(join(target, 'package-lock.json'), 'utf8'),
      );
      assert.equal(pkg.private, true); // npm publishing only; GitHub privacy needs a live check.
      assert.equal(lock.name, pkg.name);
      assert.equal(lock.packages[''].name, pkg.name);
      for (const command of [
        'dev',
        'check',
        'build',
        'preview',
        'verify:launch',
        'verify:seo',
        'verify:quality',
        'verify:site',
        'content:new',
        'content:generate',
        'content:publish',
      ])
        assert.equal(typeof pkg.scripts[command], 'string');
      for (const command of [
        'test',
        'test:exports',
        'create-site',
        'build:catalog',
        'verify:catalog',
      ])
        assert.equal(pkg.scripts[command], undefined);
      const config = JSON.parse(
        await readFile(join(target, 'src/agent.config.json'), 'utf8'),
      );
      assert.equal(config.demo, true);
      assert.equal(config.content.scheduleEnabled, false);

      // Exercise the documented git-add flow, including real ignore semantics.
      await exec('git', ['init', '--quiet', '--initial-branch=main'], {
        cwd: target,
      });
      const ignored = [
        '.env',
        '.env.local',
        '.hostinger/state.json',
        'node_modules/package.json',
        'dist/index.html',
        '.astro/content.d.ts',
      ];
      const { stdout } = await exec(
        'git',
        ['check-ignore', '--no-index', '--', ...ignored, '.env.example'],
        { cwd: target },
      );
      assert.deepEqual(stdout.trim().split('\n'), ignored);
      await exec('git', ['add', '.'], { cwd: target });
      const staged = (await exec('git', ['ls-files'], { cwd: target })).stdout
        .trim()
        .split('\n');
      for (const file of ownerFiles)
        assert.ok(staged.includes(file), `${theme}: missing staged ${file}`);
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
