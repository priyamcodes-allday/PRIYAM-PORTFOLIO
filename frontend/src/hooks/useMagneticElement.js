import { useEffect, useRef } from 'react';
import { pointerMotion } from '../utils/desktopPointer';

export default function useMagneticElement({ strength = 6 } = {}) {
  const buttonAreaRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => pointerMotion((finePointer) => {
    const area = buttonAreaRef.current;
    const button = buttonRef.current;
    let frame = 0;
    let previousTime = 0;
    let press = null;
    let releaseTimer = 0;
    const current = [0, 0, 1];
    const target = [0, 0, 1];
    const animate = (time) => {
      const elapsed = Math.min(time - (previousTime || time - 16), 64);
      previousTime = time;
      const factor = 1 - Math.exp(-elapsed / (press ? 55 : 130));
      let moving = false;
      current.forEach((value, index) => {
        current[index] += (target[index] - value) * factor;
        if (Math.abs(target[index] - current[index]) > (index === 2 ? 0.0001 : 0.01)) moving = true;
        else current[index] = target[index];
      });
      button.style.setProperty('--magnet-x', `${current[0]}px`);
      button.style.setProperty('--magnet-y', `${current[1]}px`);
      button.style.setProperty('--magnet-scale', current[2]);
      frame = moving ? requestAnimationFrame(animate) : 0;
      if (!moving) previousTime = 0;
    };
    const start = () => { if (!frame) frame = requestAnimationFrame(animate); };
    const reset = () => {
      clearTimeout(releaseTimer);
      releaseTimer = 0;
      press = null;
      target[0] = 0; target[1] = 0; target[2] = 1;
      start();
    };
    const aim = (event, range) => {
      // Measure the stationary wrapper so the magnet never chases its own position.
      const rect = area.getBoundingClientRect();
      const padding = event.pointerType === 'mouse' ? 16 : 0;
      const x = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2 + padding || 1);
      const y = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2 + padding || 1);
      const near = Math.abs(x) <= 1 && Math.abs(y) <= 1;
      target[0] = near ? x * range : 0;
      target[1] = near ? y * range : 0;
      start();
    };
    const move = (event) => {
      if (event.pointerType === 'mouse') {
        if (finePointer.matches) aim(event, strength);
        else reset();
      } else if (press && event.pointerId === press.id) {
        // Touch feedback is set once on press, never a finger-chasing gesture.
        if (Math.hypot(event.clientX - press.x, event.clientY - press.y) > 10) reset();
      }
    };
    const down = (event) => {
      if (event.pointerType === 'mouse' || !event.isPrimary) return;
      if (event.target.closest(':disabled, [inert]')) return;
      clearTimeout(releaseTimer);
      releaseTimer = 0;
      press = { id: event.pointerId, x: event.clientX, y: event.clientY, time: performance.now() };
      target[2] = 0.975;
      aim(event, Math.min(strength, 3));
    };
    const up = (event) => {
      if (!press || event.pointerId !== press.id) return;
      // Let even a quick tap show a brief response without delaying its action.
      releaseTimer = window.setTimeout(reset, Math.max(0, 110 - (performance.now() - press.time)));
    };
    const leave = () => { if (!releaseTimer) reset(); };
    area.addEventListener('pointerenter', move, { passive: true });
    area.addEventListener('pointermove', move, { passive: true });
    area.addEventListener('pointerdown', down, { passive: true });
    area.addEventListener('pointerup', up);
    area.addEventListener('pointercancel', reset);
    area.addEventListener('pointerleave', leave);
    window.addEventListener('blur', reset);
    window.addEventListener('scroll', reset, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(releaseTimer);
      area.removeEventListener('pointerenter', move);
      area.removeEventListener('pointermove', move);
      area.removeEventListener('pointerdown', down);
      area.removeEventListener('pointerup', up);
      area.removeEventListener('pointercancel', reset);
      area.removeEventListener('pointerleave', leave);
      window.removeEventListener('blur', reset);
      window.removeEventListener('scroll', reset);
      ['--magnet-x', '--magnet-y', '--magnet-scale'].forEach(name => button.style.removeProperty(name));
    };
  }), [strength]);

  return { buttonAreaRef, buttonRef };
}
