import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { designIds } from '../scripts/catalog.mjs';
import { attr, tags } from '../scripts/html.mjs';

test('static HTML inspection distinguishes deferred video URLs and quoted text', () => {
  const html =
    '<video data-src="/film.mp4" preload="none"></video><meta content="a > b &amp; c">';
  assert.equal(attr(tags(html, 'video')[0], 'src'), '');
  assert.equal(attr(tags(html, 'video')[0], 'data-src'), '/film.mp4');
  assert.equal(attr(tags(html, 'meta')[0], 'content'), 'a > b & c');
});

test('shared text palette maintains readable solid-surface contrast in every design', async () => {
  const luminance = (hex) => {
    const [r, g, b] = hex
      .match(/[0-9a-f]{2}/gi)
      .map((part) => parseInt(part, 16) / 255)
      .map((part) =>
        part <= 0.04045 ? part / 12.92 : ((part + 0.055) / 1.055) ** 2.4,
      );
    return r * 0.2126 + g * 0.7152 + b * 0.0722;
  };
  const contrast = (a, b) =>
    (Math.max(luminance(a), luminance(b)) + 0.05) /
    (Math.min(luminance(a), luminance(b)) + 0.05);
  for (const id of await designIds()) {
    const css = await readFile(
      new URL(`../templates/${id}/theme.css`, import.meta.url),
      'utf8',
    );
    const palette = Object.fromEntries(
      [...css.matchAll(/--(paper|ink|muted|accent):\s*(#[0-9a-f]{6})/gi)].map(
        (match) => [match[1], match[2]],
      ),
    );
    assert.ok(
      contrast(palette.ink, palette.paper) >= 4.5,
      `${id}: normal text on paper`,
    );
    assert.ok(
      contrast(palette.muted, palette.paper) >= 4.5,
      `${id}: muted text on paper`,
    );
    assert.ok(
      contrast(palette.accent, palette.paper) >= 3,
      `${id}: large accent headings on paper`,
    );
  }
});
