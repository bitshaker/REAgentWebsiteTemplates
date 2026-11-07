import test from 'node:test';
import assert from 'node:assert/strict';
import {
  automaticPlaybackAllowed,
  shouldPlayFilm,
} from '../src/lib/film-playback.mjs';

test('background film autoplay respects motion and data preferences', () => {
  assert.equal(
    automaticPlaybackAllowed({
      reducedMotion: false,
      saveData: false,
      effectiveType: '4g',
    }),
    true,
  );
  for (const overrides of [
    { reducedMotion: true },
    { saveData: true },
    { effectiveType: 'slow-2g' },
    { effectiveType: '2g' },
    { effectiveType: '3g' },
  ])
    assert.equal(
      automaticPlaybackAllowed({
        reducedMotion: false,
        saveData: false,
        ...overrides,
      }),
      false,
    );
});
test('explicit play works with preferences; user pause, leaving view and hidden tabs win', () => {
  const visible = {
    inView: true,
    hidden: false,
    pausedByUser: false,
    startedByUser: false,
    automatic: false,
  };
  assert.equal(shouldPlayFilm(visible), false);
  assert.equal(shouldPlayFilm({ ...visible, startedByUser: true }), true);
  assert.equal(shouldPlayFilm({ ...visible, automatic: true }), true);
  for (const overrides of [
    { pausedByUser: true },
    { inView: false },
    { hidden: true },
  ])
    assert.equal(
      shouldPlayFilm({
        ...visible,
        automatic: true,
        startedByUser: true,
        ...overrides,
      }),
      false,
    );
});
