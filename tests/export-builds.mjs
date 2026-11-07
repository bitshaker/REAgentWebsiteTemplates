import { designIds } from '../scripts/catalog.mjs';
import { createSite } from '../scripts/create-site.mjs';
import {
  mkdtemp,
  writeFile,
  readFile,
  readdir,
  access,
  rm,
} from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import assert from 'node:assert/strict';
const exec = promisify(execFile);
const temp = await mkdtemp(join(tmpdir(), 'reagent-builds-'));
try {
  const results = [];
  const ids = await designIds();
  // Bound installations/type checks to fit standard GitHub-hosted runners.
  for (let offset = 0; offset < ids.length; offset += 2) {
    results.push(
      ...(await Promise.allSettled(
        ids.slice(offset, offset + 2).map(async (theme) => {
          const target = await createSite(theme, join(temp, theme));
          await exec('npm', ['ci', '--no-audit', '--no-fund'], { cwd: target });
          await writeFile(
            join(target, 'src/content/blog/unpublished-test.md'),
            '---\ntitle: Unpublished test\ndescription: This draft should never be published.\ndate: 2026-01-01\ndraft: true\n---\nPrivate draft body.',
          );
          await writeFile(
            join(target, 'src/content/blog/future-test.md'),
            '---\ntitle: Future test\ndescription: Future content should never be published early.\ndate: 2099-01-01\ndraft: false\n---\nFuture article body.',
          );
          const config = JSON.parse(
            await readFile(join(target, 'src/agent.config.json'), 'utf8'),
          );
          config.demo = false;
          config.siteUrl = 'https://sample-agent.test';
          config.phone = '+1 (202) 555-0142';
          await writeFile(
            join(target, 'src/agent.config.json'),
            JSON.stringify(config),
          );
          await exec('npm', ['run', 'check'], { cwd: target });
          await exec('npm', ['run', 'build'], { cwd: target });
          for (const slug of ['unpublished-test', 'future-test'])
            await assert.rejects(
              access(join(target, 'dist/blog', slug, 'index.html')),
            );
          const rss = await readFile(join(target, 'dist/rss.xml'), 'utf8');
          assert.doesNotMatch(rss, /unpublished-test|future-test/);
          const home = await readFile(join(target, 'dist/index.html'), 'utf8');
          assert.match(home, /application\/ld\+json/);
          assert.match(home, /https:\/\/sample-agent.test/);
          assert.doesNotMatch(
            home,
            /Demonstration website|AI-generated sample portrait/,
          );
          // Exercise owner configuration through every rendered call path,
          // including the hero and mobile bar in a catalog-free export.
          assert.doesNotMatch(home, /class="agent-presence"/);
          assert.match(home, /class="mobile-call-bar"/);
          assert.match(home, /class="nav-call"/);
          assert.doesNotMatch(home, /555\) 010-0123|tel:\+15550100123/);
          const hero = home.slice(
            home.indexOf('collection-home'),
            home.indexOf('id="meet-agent"'),
          );
          assert.doesNotMatch(hero, /agent-portrait|Sample portrait/);
          assert.match(hero, /href="tel:\+12025550142"/);
          for (const [, destination] of home.matchAll(/href="(tel:[^"]+)"/g))
            assert.equal(destination, 'tel:+12025550142');
          for (const page of [
            'buyers',
            'sellers',
            'about',
            'contact',
            'blog',
            'blog/preparing-for-your-next-move',
          ]) {
            const html = await readFile(
              join(target, 'dist', page, 'index.html'),
              'utf8',
            );
            assert.match(html, new RegExp(`data-design="${theme}"`));
            assert.match(html, /<img[^>]+fetchpriority="high"/);
            assert.doesNotMatch(html, /href="\/preview\//);
            assert.match(html, /href="tel:\+12025550142"/);
            if (page === 'contact') {
              assert.match(html, /<a href="mailto:/);
              assert.match(html, /<a href="tel:/);
            }
          }
          const assets = await readdir(join(target, 'dist'), {
            recursive: true,
          });
          assert.equal(
            assets.filter((asset) => asset.endsWith('.mp4')).length,
            1,
          );
          const robots = await readFile(
            join(target, 'dist/robots.txt'),
            'utf8',
          );
          assert.match(robots, /Allow: \//);
          console.log(
            `${theme}: independent npm ci, type check, production build, draft/future exclusion, RSS, schema, canonical and robots passed`,
          );
        }),
      )),
    );
  }
  for (const result of results)
    if (result.status === 'rejected') throw result.reason;
} finally {
  await rm(temp, { recursive: true, force: true });
}
