const finePointerQuery = '(hover: hover) and (pointer: fine)';

// Input capability is independent of viewport width and touch-point count.
export function desktopPointer(setup) {
  return pointerPreference(
    `${finePointerQuery} and (prefers-reduced-motion: no-preference)`,
    setup,
  );
}

// One listener set handles actual mouse, touch, and pen events, including hybrids.
export function pointerMotion(setup) {
  return pointerPreference(
    '(prefers-reduced-motion: no-preference)',
    () => setup(window.matchMedia(finePointerQuery)),
  );
}

function pointerPreference(condition, setup) {
  const query = window.matchMedia(condition);
  let dispose;
  const update = () => {
    dispose?.();
    dispose = query.matches ? setup() : undefined;
  };
  update();
  query.addEventListener('change', update);
  return () => {
    query.removeEventListener('change', update);
    dispose?.();
  };
}
