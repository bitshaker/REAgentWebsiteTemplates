import test from 'node:test';
import assert from 'node:assert/strict';
import {
  indexablePath,
  withoutBase,
  serializeSchema,
} from '../src/lib/seo-policy.mjs';

test('JSON-LD round-trips untrusted editorial text without terminating its script', () => {
  const value = { headline: '</script><script>alert("test")</script> & a < b' };
  const json = serializeSchema(value);
  assert.doesNotMatch(json, /</);
  assert.deepEqual(JSON.parse(json), value);
});

test('catalog and error routes are excluded without rejecting similarly named articles', () => {
  for (const path of [
    '/preview/forma/',
    '/designs/',
    '/start/',
    '/start/still/',
    '/404/',
    '/404.html',
    '/500/',
  ])
    assert.equal(indexablePath(path), false, path);
  for (const path of [
    '/',
    '/buyers/',
    '/privacy/',
    '/blog/start-here/',
    '/blog/home-designs/',
  ])
    assert.equal(indexablePath(path), true, path);
  assert.equal(withoutBase('/office/buyers/', '/office/'), '/buyers/');
  assert.equal(withoutBase('/office/', '/office/'), '/');
  assert.equal(withoutBase('/officer/', '/office/'), '/officer/');
});
