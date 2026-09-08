import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function PageIntro() {
  const [phase, setPhase] = useState('cover');
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useLayoutEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const root = document.getElementById('root');
    const wasInert = root?.inert;
    const locks = [
      [document.documentElement, 'overflow-hidden'],
      [document.documentElement, '[scrollbar-gutter:stable]'],
      [document.documentElement, 'bg-[#171A1B]'],
      [document.body, 'overflow-hidden'],
    ].map(([element, className]) => ({ element, className, existed: element.classList.contains(className) }));
    const timers = new Set();
    let finished = false;
    let restored = false;
    const schedule = (callback, delay) => {
      const timer = window.setTimeout(() => { timers.delete(timer); callback(); }, delay);
      timers.add(timer);
    };
    const clearTimers = () => { timers.forEach(clearTimeout); timers.clear(); };
    const restore = () => {
      if (restored) return;
      restored = true;
      locks.forEach(({ element, className, existed }) => { if (!existed) element.classList.remove(className); });
      if (root) root.inert = wasInert;
    };
    const finish = () => {
      finished = true;
      restore();
      preference.removeEventListener('change', preferenceChanged);
      setPhase('done');
    };
    const quickFade = () => {
      clearTimers();
      setReducedMotion(true);
      schedule(() => setPhase('exit'), 30);
      schedule(finish, 200);
    };
    const preferenceChanged = () => {
      if (!finished && preference.matches) quickFade();
    };

    locks.forEach(({ element, className }) => element.classList.add(className));
    if (root) root.inert = true;
    if (preference.matches) quickFade();
    else {
      schedule(() => setPhase('title'), 100);
      schedule(() => setPhase('hide-title'), 450);
      schedule(() => setPhase('exit'), 600);
      schedule(finish, 1100);
    }
    preference.addEventListener('change', preferenceChanged);
    return () => {
      clearTimers();
      preference.removeEventListener('change', preferenceChanged);
      restore();
    };
  }, []);

  if (phase === 'done') return null;

  // A portal covers the inert application without delaying its normal rendering.
  return createPortal(
    <div
      aria-hidden="true"
      data-page-intro=""
      className={`fixed inset-0 z-[99999] flex h-dvh touch-none items-center justify-center bg-[#171A1B] ${reducedMotion
        ? `transition-opacity duration-150 ${phase === 'exit' ? 'opacity-0' : 'opacity-100'}`
        : `transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${phase === 'exit' ? '-translate-y-full' : 'translate-y-0'}`}`}
    >
      <span className={`font-['Oswald'] text-3xl font-bold uppercase tracking-[0.12em] text-[#F1F0E9] transition-[opacity,translate] duration-150 ease-out ${reducedMotion || phase === 'title'
        ? 'translate-y-0 opacity-100'
        : phase === 'cover' ? 'translate-y-2 opacity-0' : '-translate-y-2 opacity-0'}`}>
        PRIYAM
      </span>
    </div>,
    document.body,
  );
}
