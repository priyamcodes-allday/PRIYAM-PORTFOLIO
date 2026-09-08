import { useEffect, useRef } from 'react';
import { SiReact, SiJavascript, SiNodedotjs, SiExpress, SiMongodb, SiTailwindcss } from 'react-icons/si';
import Container from '../common/Container';
import { technologies } from '../../data/technologies';

const icons = {
  react: SiReact,
  javascript: SiJavascript,
  node: SiNodedotjs,
  express: SiExpress,
  mongodb: SiMongodb,
  tailwind: SiTailwindcss,
};

export default function Technologies() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = window.matchMedia('(min-width: 1024px)');
    const track = trackRef.current;
    let frame = 0;
    let previousTime = null;
    let progress = 0;
    let inView = false;
    const reset = () => track.style.removeProperty('--marquee-x');
    const tick = (time) => {
      const duration = desktop.matches ? 24000 : 20000;
      if (previousTime !== null) progress = (progress + (time - previousTime) / duration) % 1;
      previousTime = time;
      // Equal-width sequences include their trailing gap, so -50% is an exact loop.
      track.style.setProperty('--marquee-x', `${-50 * progress}%`);
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      previousTime = null;
      if (preference.matches) { progress = 0; reset(); }
      else if (inView && !document.hidden) frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    observer.observe(sectionRef.current);
    preference.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      preference.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
      reset();
    };
  }, []);

  return (
    <section ref={sectionRef} aria-labelledby="technologies-title" className="pt-16 md:pt-24 lg:pt-32">
      <Container>
        <h2 id="technologies-title" className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-white/80 sm:text-sm">
          TECHNOLOGIES I WORK WITH
        </h2>
        <div className="mx-auto mt-12 max-w-[1400px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:[mask-image:none] lg:mt-16">
          <div ref={trackRef} className="flex w-max items-center [transform:translate3d(var(--marquee-x,0%),0,0)] motion-reduce:w-full motion-reduce:scale-100 motion-reduce:transform-none">
            {[0, 1].map(copy => (
              <ul key={copy} aria-hidden={copy === 1 ? true : undefined} className={`flex shrink-0 items-center gap-8 pr-8 sm:gap-16 sm:pr-16 lg:gap-20 lg:pr-20 xl:gap-28 xl:pr-28 2xl:gap-32 2xl:pr-32 ${copy === 1 ? 'motion-reduce:hidden' : 'motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-8 motion-reduce:gap-y-4 motion-reduce:pr-0'}`}>
                {technologies.map(technology => {
                  const Icon = icons[technology.iconKey];
                  return (
                    <li key={technology.iconKey} className="flex h-16 shrink-0 items-center gap-3 whitespace-nowrap text-base font-semibold text-white/45 transition-all duration-300 ease-out hover:scale-[1.03] hover:text-white/90 active:text-white/90 motion-reduce:scale-100 motion-reduce:transform-none motion-reduce:transition-none sm:text-xl lg:text-2xl">
                      <Icon aria-hidden="true" focusable="false" className="shrink-0 text-2xl sm:text-3xl lg:text-4xl" />
                      <span>{technology.name}</span>
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
