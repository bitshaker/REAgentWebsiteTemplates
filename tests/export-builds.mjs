import { designIds } from '../scripts/catalog.mjs';
import { createSite } from '../scripts/create-site.mjs';
import { schemaGraph } from '../scripts/verify-seo.mjs';
import {
  mkdtemp,
  writeFile,
  readFile,
  readdir,
  access,
  copyFile,
  mkdir,
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
          const source = await createSite(theme, join(temp, theme));
          // Build a fresh clone, proving that git-add preserves every required asset.
          await exec('git', ['init', '--quiet', '--initial-branch=main'], {
            cwd: source,
          });
          await exec('git', ['add', '.'], { cwd: source });
          await exec(
            'git',
            [
              '-c',
              'user.name=Starter Test',
              '-c',
              'user.email=starter@example.test',
              '-c',
              'commit.gpgsign=false',
              '-c',
              'core.hooksPath=/dev/null',
              'commit',
              '--quiet',
              '-m',
              'Exported starter fixture',
            ],
            { cwd: source },
          );
          const target = join(temp, `${theme}-clone`);
          await exec('git', [
            'clone',
            '--quiet',
            '--no-hardlinks',
            source,
            target,
          ]);
          await exec('npm', ['ci', '--no-audit', '--no-fund'], { cwd: target });
          await writeFile(
            join(target, 'src/content/blog/unpublished-test.md'),
            '---\ntitle: Unpublished test\ndescription: This draft should never be published.\ndate: 2026-01-01\ndraft: true\n---\nPrivate draft body.',
          );
          await writeFile(
            join(target, 'src/content/blog/future-test.md'),
            '---\ntitle: Future test\ndescription: Future content should never be published early.\ndate: 2099-01-01\ndraft: false\n---\nFuture article body.',
          );
          await writeFile(
            join(target, 'src/content/blog/seo-fixture.md'),
            `---
title: 'A guide with </script> & other questions'
description: 'A fixture for testing article metadata, images, dates, and a guest author.'
date: 2020-01-01
updated: 2020-02-01
draft: false
author: 'Guest Writer'
authorUrl: 'https://writer.test/about/'
image:
  src: '/images/social-card.png'
  alt: 'Test article cover'
  width: 1200
  height: 630
---
This article exercises the optional editorial metadata.
`,
          );
          const base = theme === 'panorama' ? '/agent-office/' : '/';
          const options = {
            cwd: target,
            env: { ...process.env, CATALOG_BASE: base, CATALOG_SITE_URL: '' },
          };
          if (theme === 'forma') {
            await exec('npm', ['run', 'build'], options);
            const demo = await readFile(
              join(target, 'dist/index.html'),
              'utf8',
            );
            assert.match(demo, /noindex, follow/);
            assert.equal(schemaGraph(demo).length, 0);
          }
          const config = JSON.parse(
            await readFile(join(target, 'src/agent.config.json'), 'utf8'),
          );
          config.demo = false;
          config.siteUrl = 'https://sample-agent.test';
          config.phone = '+1 (202) 555-0142';
          Object.assign(config, {
            name: 'Maya Chen',
            brand: 'Maya Chen Homes',
            market: 'Cedar Bay (fictional)',
            email: 'maya@example.com',
            bio: 'Fictional personalization fixture: clear questions, practical preparation, and thoughtful communication.',
            brokerage: 'Example Brokerage (fictional)',
            license: 'DEMO ONLY — no real license',
            serviceAreas: [
              'Harbor Quarter (fictional)',
              'Cedar Heights (fictional)',
            ],
            address: {
              street: '123 Example Lane',
              city: 'Cedar Bay (fictional)',
              region: 'CA',
              postalCode: '00000',
              country: 'US',
            },
          });
          // Exercise a replacement photo in each design, while retaining one
          // no-photo case to verify that production never falls back to a demo face.
          if (theme !== 'neighborly') {
            config.portraitUrl = '/images/test-headshot.jpg';
            await copyFile(
              new URL('../src/assets/demo-agent-portrait.jpg', import.meta.url),
              join(target, 'public/images/test-headshot.jpg'),
            );
          }
          const nativePortrait = ['monogram', 'panorama'].includes(theme);
          if (nativePortrait) {
            config.portraitUrl = 'src/assets/portraits/test-headshot.jpg';
            await mkdir(join(target, 'src/assets/portraits'), {
              recursive: true,
            });
            await copyFile(
              new URL('../src/assets/demo-agent-portrait.jpg', import.meta.url),
              join(target, config.portraitUrl),
            );
          }
          if (theme === 'still') {
            config.socialImage = '/images/social-card.png';
            config.socialImageAlt = 'Configured sharing image';
          }
          await writeFile(
            join(target, 'src/agent.config.json'),
            JSON.stringify(config),
          );
          await exec('npm', ['run', 'check'], options);
          await exec('npm', ['run', 'build'], options);
          for (const slug of ['unpublished-test', 'future-test'])
            await assert.rejects(
              access(join(target, 'dist/blog', slug, 'index.html')),
            );
          const rss = await readFile(join(target, 'dist/rss.xml'), 'utf8');
          assert.doesNotMatch(rss, /unpublished-test|future-test/);
          const home = await readFile(join(target, 'dist/index.html'), 'utf8');
          assert.match(home, /application\/ld\+json/);
          assert.match(home, /https:\/\/sample-agent.test/);
          assert.match(home, /Meet Maya Chen\./);
          assert.match(home, /Maya Chen Homes/);
          assert.ok(home.includes(config.bio));
          assert.doesNotMatch(
            home,
            /Alex Morgan|Morgan &amp; Home|hello@example\.com|Your brokerage|YOUR LICENSE NUMBER/,
          );
          if (nativePortrait) {
            assert.match(home, /class="agent-portrait/);
            assert.match(home, /alt="Maya Chen"/);
            assert.match(home, /srcset="[^"]+\.webp/);
            const person = schemaGraph(home).find(
              (node) => node['@type'] === 'Person',
            );
            assert.match(
              person.image,
              new RegExp(`^https://sample-agent.test${base}_astro/.+\\.webp$`),
            );
            assert.doesNotMatch(person.image, /src\/assets/);
          } else if (config.portraitUrl) {
            assert.ok(home.includes(`src="${base}images/test-headshot.jpg"`));
            assert.match(home, /alt="Maya Chen"/);
            await access(join(target, 'dist/images/test-headshot.jpg'));
          } else assert.doesNotMatch(home, /class="agent-portrait/);
          if (theme === 'forma')
            assert.match(home, /id="forma-title"[^>]*>\s*Chen/);
          if (theme === 'monogram')
            assert.match(home, /class="m-initials"[^>]*>\s*MC\s*</);
          const graph = schemaGraph(home);
          const business = graph.find(
            (node) => node['@type'] === 'RealEstateAgent',
          );
          assert.equal(business.name, config.brand);
          assert.equal(business.telephone, config.phone);
          assert.equal(business.address.streetAddress, config.address.street);
          assert.equal(
            graph.find((node) => node['@type'] === 'Person').name,
            config.name,
          );
          const fixture = await readFile(
            join(target, 'dist/blog/seo-fixture/index.html'),
            'utf8',
          );
          const article = schemaGraph(fixture).find(
            (node) => node['@type'] === 'BlogPosting',
          );
          assert.equal(
            article.headline,
            'A guide with </script> & other questions',
          );
          assert.equal(article.author.name, 'Guest Writer');
          assert.equal(article.author.url, 'https://writer.test/about/');
          assert.equal(
            article.image,
            `https://sample-agent.test${base}images/social-card.png`,
          );
          assert.match(fixture, /\\u003c\/script>/);
          assert.equal(article.dateModified, '2020-02-01T00:00:00.000Z');
          const post = await readFile(
            join(target, 'dist/blog/preparing-for-your-next-move/index.html'),
            'utf8',
          );
          assert.equal(
            schemaGraph(post).find((node) => node['@type'] === 'BlogPosting')
              .author['@id'],
            `https://sample-agent.test${base}#agent`,
          );
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
            assert.doesNotMatch(
              html,
              /Alex Morgan|Morgan &amp; Home|hello@example\.com|Your brokerage|YOUR LICENSE NUMBER/,
            );
            if (page === 'about') {
              assert.ok(html.includes(config.bio));
              for (const area of config.serviceAreas)
                assert.ok(html.includes(area));
              if (nativePortrait) {
                assert.match(html, /class="agent-portrait/);
                assert.match(html, /alt="Maya Chen"/);
              } else if (config.portraitUrl) {
                assert.ok(
                  html.includes(`src="${base}images/test-headshot.jpg"`),
                );
                assert.match(html, /alt="Maya Chen"/);
              } else assert.doesNotMatch(html, /class="agent-portrait/);
            }
            if (page === 'contact') {
              assert.match(html, /<a href="mailto:maya@example\.com"/);
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
            `${theme}: fresh Git clone, independent install/check/build, SEO/quality checks, identity/headshot replacement, schema, RSS and draft/future exclusion passed`,
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
