/** Decorative motion is opt-in on reduced-motion/data-saving connections. */
export function automaticPlaybackAllowed({
  reducedMotion,
  saveData,
  effectiveType,
}) {
  return (
    !reducedMotion &&
    !saveData &&
    !['slow-2g', '2g', '3g'].includes(effectiveType)
  );
}

/** Explicit play can override preferences, while leaving view always pauses. */
export function shouldPlayFilm({
  inView,
  hidden,
  pausedByUser,
  startedByUser,
  automatic,
}) {
  return inView && !hidden && !pausedByUser && (startedByUser || automatic);
}
