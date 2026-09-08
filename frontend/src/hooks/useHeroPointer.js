import { useEffect, useRef } from 'react';
import { pointerMotion } from '../utils/desktopPointer';
import useMagneticElement from './useMagneticElement';

export default function useHeroPointer() {
  const portraitRef = useRef(null);
  const { buttonAreaRef, buttonRef } = useMagneticElement();

  useEffect(() => pointerMotion((finePointer) => {
    const portrait = portraitRef.current;
    let frame = 0;
    let previousTime = 0;
    // Photo rotation and photo x/y. Match the static resting angle.
    const resting = [-2, 0, 0];
    const current = [...resting];
    const target = [...resting];
    const clamp = (value) => Math.max(-1, Math.min(1, value));
    let gesture = null;
    let releaseTimer = 0;

    const animate = (time) => {
      const elapsed = Math.min(time - (previousTime || time - 16), 64);
      previousTime = time;
      let moving = false;
      current.forEach((value, index) => {
        // Roughly 0.08 per frame for a weighted photo swing, independent of refresh rate.
        const factor = 1 - Math.exp(-elapsed / 200);
        current[index] += (target[index] - value) * factor;
        if (Math.abs(target[index] - current[index]) > 0.01) moving = true;
        else current[index] = target[index];
      });
      portrait.style.setProperty('--photo-rotation', `${current[0]}deg`);
      portrait.style.setProperty('--photo-x', `${current[1]}px`);
      portrait.style.setProperty('--photo-y', `${current[2]}px`);
      frame = moving ? requestAnimationFrame(animate) : 0;
      if (!moving) previousTime = 0;
    };
    const start = () => { if (!frame) frame = requestAnimationFrame(animate); };
    const reset = () => {
      clearTimeout(releaseTimer);
      releaseTimer = 0;
      gesture = null;
      target.forEach((_, index) => { target[index] = resting[index]; });
      start();
    };
    const resetPortrait = () => {
      target.splice(0, 3, ...resting.slice(0, 3));
      start();
    };
    const movePortrait = (event) => {
      if (event.pointerType !== 'mouse') {
        if (!gesture || event.pointerId !== gesture.id) return;
        const dx = event.clientX - gesture.x;
        const dy = event.clientY - gesture.y;
        if (!gesture.horizontal) {
          if (Math.abs(dy) > 8 && Math.abs(dy) >= Math.abs(dx)) { reset(); return; }
          if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
          gesture.horizontal = true;
        }
        const bounds = gesture.bounds;
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) { reset(); return; }
        const horizontal = clamp((event.clientX - bounds.left) / bounds.width * 2 - 1);
        target[0] = horizontal * 7;
        target[1] = horizontal * 5;
        target[2] = clamp(dy / 40) * 3;
        start();
        return;
      }
      if (!finePointer.matches) { reset(); return; }
      const bounds = portrait.getBoundingClientRect();
      const horizontal = clamp((event.clientX - bounds.left) / bounds.width * 2 - 1);
      const vertical = clamp((event.clientY - bounds.top) / bounds.height * 2 - 1);
      target[0] = horizontal * 7;
      target[1] = horizontal * 5;
      target[2] = vertical * 3;
      start();
    };
    const beginTouch = (event) => {
      if (event.pointerType === 'mouse' || !event.isPrimary) return;
      clearTimeout(releaseTimer);
      releaseTimer = 0;
      const bounds = portrait.getBoundingClientRect();
      gesture = { id: event.pointerId, x: event.clientX, y: event.clientY, horizontal: false, bounds, time: performance.now() };
      // A small photo nudge gives taps feedback before a horizontal drag begins.
      const direction = event.clientX < bounds.left + bounds.width / 2 ? -1 : 1;
      target[0] = resting[0] + direction * 2;
      target[1] = direction;
      target[2] = 1;
      start();
    };
    const endTouch = (event) => {
      if (!gesture || event.pointerId !== gesture.id) return;
      if (gesture.horizontal) reset();
      else releaseTimer = window.setTimeout(reset, Math.max(0, 160 - (performance.now() - gesture.time)));
    };
    const leave = (event) => {
      if (event.pointerType === 'mouse') resetPortrait();
      else if (!releaseTimer) reset();
    };
    portrait.addEventListener('pointerdown', beginTouch, { passive: true });
    portrait.addEventListener('pointerup', endTouch);
    portrait.addEventListener('pointercancel', reset);
    portrait.addEventListener('pointerenter', movePortrait, { passive: true });
    portrait.addEventListener('pointermove', movePortrait, { passive: true });
    portrait.addEventListener('pointerleave', leave);
    window.addEventListener('blur', reset);
    window.addEventListener('scroll', reset, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(releaseTimer);
      portrait.removeEventListener('pointerenter', movePortrait);
      portrait.removeEventListener('pointermove', movePortrait);
      portrait.removeEventListener('pointerleave', leave);
      portrait.removeEventListener('pointerdown', beginTouch);
      portrait.removeEventListener('pointerup', endTouch);
      portrait.removeEventListener('pointercancel', reset);
      window.removeEventListener('blur', reset);
      window.removeEventListener('scroll', reset);
      ['--photo-rotation', '--photo-x', '--photo-y'].forEach(name => portrait.style.removeProperty(name));
    };
  }), []);

  return { portraitRef, buttonAreaRef, buttonRef };
}
