import assert from 'node:assert/strict';
import { readFile, readdir, stat, access } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { attr, tags } from './html.mjs';
import { withoutBase } from '../src/lib/seo-policy.mjs';

/** Structural checks complement keyboard, screen-reader and visual testing. */
export async function verifyQuality(
  root = process.cwd(),
  base = process.env.CATALOG_BASE || '/',
) {
  const dist = join(root, 'dist');
  const files = await readdir(dist, { recursive: true });
  let images = 0;
  let pages = 0;
  let maxPageScriptBytes = 0;
  for (const file of files.filter((file) => file.endsWith('.html'))) {
    const html = await readFile(join(dist, file), 'utf8');
    const label = `${file}: `;
    const mains = tags(html, 'main');
    assert.equal(mains.length, 1, label + 'one main landmark');
    assert.equal(attr(mains[0], 'id'), 'main', label + 'skip-link target');
    assert.equal(
      attr(mains[0], 'tabindex'),
      '-1',
      label + 'focusable skip target',
    );
    assert.ok(
      tags(html, 'a').some((tag) => attr(tag, 'href') === '#main'),
      label + 'skip link',
    );
    assert.ok(attr(tags(html, 'html')[0], 'lang'), label + 'document language');
    assert.equal(tags(html, 'h1').length, 1, label + 'one primary heading');
    assert.ok(
      !html.includes('[object Object]'),
      label + 'serialized object in rendered markup',
    );
    const ids = tags(html, '[a-z][a-z0-9:-]*')
      .map((tag) => attr(tag, 'id'))
      .filter(Boolean);
    assert.equal(new Set(ids).size, ids.length, label + 'unique IDs');
    for (const tag of tags(html, 'img')) {
      images++;
      assert.match(tag, /\salt="/, label + 'image alt attribute');
      assert.ok(
        Number(attr(tag, 'width')) > 0 && Number(attr(tag, 'height')) > 0,
        label + 'intrinsic image dimensions',
      );
      if (attr(tag, 'srcset')) {
        assert.ok(attr(tag, 'sizes'), label + 'responsive image sizes');
        for (const candidate of attr(tag, 'srcset').split(',')) {
          const url = candidate.trim().split(/\s+/)[0];
          if (url.startsWith('/') && !url.startsWith('//'))
            await access(
              join(dist, decodeURIComponent(withoutBase(url, base))),
            );
        }
      }
      if (attr(tag, 'fetchpriority') === 'high')
        assert.notEqual(
          attr(tag, 'loading'),
          'lazy',
          label + 'hero image must not be lazy loaded',
        );
    }
    for (const video of tags(html, 'video')) {
      assert.equal(
        attr(video, 'preload'),
        'none',
        label + 'no initial film download',
      );
      assert.equal(
        attr(video, 'src'),
        '',
        label + 'film URL attached only when playing',
      );
      assert.equal(
        attr(video, 'aria-hidden'),
        'true',
        label + 'decorative film hidden from assistive technology',
      );
      assert.equal(
        attr(video, 'tabindex'),
        '-1',
        label + 'decorative film outside tab sequence',
      );
      assert.ok(attr(video, 'poster'), label + 'static poster fallback');
      assert.ok(
        ['eager', 'lazy'].includes(attr(video, 'loading')),
        label + 'explicit poster loading',
      );
    }
    for (const button of tags(html, 'button'))
      assert.equal(
        attr(button, 'type'),
        'button',
        label + 'explicit button type',
      );
    for (const tag of tags(
      html,
      '(?:a|button|div|summary|input|select|textarea)',
    ))
      assert.ok(
        Number(attr(tag, 'tabindex') || 0) <= 0,
        label + 'no positive tabindex',
      );
    pages++;
    let pageScriptBytes = 0;
    const scriptFiles = new Set();
    for (const [, attributes, body] of html.matchAll(
      /<script\b([^>]*)>([\s\S]*?)<\/script>/g,
    )) {
      if (attr(attributes, 'type') === 'application/ld+json') continue;
      pageScriptBytes += Buffer.byteLength(body);
      const src = attr(attributes, 'src');
      if (src.startsWith('/') && !src.startsWith('//')) scriptFiles.add(src);
    }
    for (const src of scriptFiles)
      pageScriptBytes += (await stat(join(dist, withoutBase(src, base)))).size;
    maxPageScriptBytes = Math.max(maxPageScriptBytes, pageScriptBytes);
  }
  assert.ok(
    files.some((file) => file.endsWith('.woff2')),
    'Self-hosted WOFF2 fonts are included.',
  );
  assert.ok(
    !files.some((file) => /\.(?:ttf|otf)$/.test(file)),
    'Legacy uncompressed web fonts should not ship.',
  );
  const bytes = async (extension) =>
    (
      await Promise.all(
        files
          .filter((file) => file.endsWith(extension))
          .map(async (file) => (await stat(join(dist, file))).size),
      )
    ).reduce((a, b) => a + b, 0);
  return {
    pages,
    images,
    fontBytes: await bytes('.woff2'),
    scriptBytes: await bytes('.js'),
    maxPageScriptBytes,
  };
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  verifyQuality()
    .then((result) =>
      console.log(
        `Quality checks passed: ${result.pages} pages, ${result.images} images; ${result.fontBytes} font bytes across the build, at most ${result.maxPageScriptBytes} JavaScript bytes per page.`,
      ),
    )
    .catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
