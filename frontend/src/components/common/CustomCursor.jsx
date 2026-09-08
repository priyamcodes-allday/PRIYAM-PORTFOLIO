import { useEffect, useRef } from 'react';
import { desktopPointer } from '../../utils/desktopPointer';

export default function CustomCursor({ scopeRef }) {
  const cursorRef = useRef(null);

  useEffect(() => desktopPointer(() => {
    const scope = scopeRef.current;
    const cursor = cursorRef.current;
    let frame = 0;
    let visible = false;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let previousTime = 0;
    const place = () => {
      cursor.style.setProperty('--cursor-x', `${x}px`);
      cursor.style.setProperty('--cursor-y', `${y}px`);
    };
    const animate = (time) => {
      const factor = 1 - Math.exp(-Math.min(time - (previousTime || time - 16), 64) / 65);
      previousTime = time;
      x += (targetX - x) * factor;
      y += (targetY - y) * factor;
      const moving = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.1;
      if (!moving) { x = targetX; y = targetY; previousTime = 0; }
      place();
      frame = moving ? requestAnimationFrame(animate) : 0;
    };
    const hide = () => {
      visible = false;
      cursor.removeAttribute('data-visible');
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
    };
    const hover = (element) => {
      cursor.dataset.interactive = String(Boolean(element?.closest(
        'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [role="button"], [data-cursor-interactive="true"], [tabindex]:not([tabindex="-1"])',
      )));
    };
    const move = (event) => {
      if (event.pointerType !== 'mouse') { hide(); return; }
      targetX = event.clientX;
      targetY = event.clientY;
      if (!visible) {
        x = targetX; y = targetY; place();
        visible = true;
        cursor.dataset.visible = 'true';
      }
      hover(event.target);
      if (!frame) frame = requestAnimationFrame(animate);
    };
    const refreshHover = () => hover(document.elementFromPoint(targetX, targetY));
    const keydown = (event) => { if (event.key === 'Tab') hide(); };
    const pointerDown = (event) => { if (event.pointerType !== 'mouse') hide(); };
    scope.addEventListener('pointermove', move, { passive: true });
    scope.addEventListener('pointerleave', hide);
    window.addEventListener('pointerdown', pointerDown, { passive: true });
    window.addEventListener('blur', hide);
    window.addEventListener('keydown', keydown);
    window.addEventListener('scroll', refreshHover, { passive: true });
    document.addEventListener('visibilitychange', hide);
    return () => {
      hide();
      scope.removeEventListener('pointermove', move);
      scope.removeEventListener('pointerleave', hide);
      window.removeEventListener('pointerdown', pointerDown);
      window.removeEventListener('blur', hide);
      window.removeEventListener('keydown', keydown);
      window.removeEventListener('scroll', refreshHover);
      document.removeEventListener('visibilitychange', hide);
    };
  }), [scopeRef]);

  return <div ref={cursorRef} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[9999] opacity-0 data-[visible=true]:opacity-100 [transform:translate3d(var(--cursor-x,0px),var(--cursor-y,0px),0)] [&[data-interactive=true]>span]:h-16 [&[data-interactive=true]>span]:w-16"><span className="block h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#85857e] transition-[width,height] duration-300 ease-out" /></div>;
}
