import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import useMagneticElement from '../../hooks/useMagneticElement';

export default function ScrollToTopButton() {
  const { buttonAreaRef, buttonRef } = useMagneticElement();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };

  return (
    <div
      ref={buttonAreaRef}
      className={`fixed bottom-4 right-4 z-40 h-11 w-11 transition-all duration-300 ease-out motion-reduce:transition-none sm:bottom-6 sm:right-6 ${isVisible ? 'translate-y-0 scale-100 opacity-100 pointer-events-auto' : 'translate-y-2 scale-90 opacity-0 pointer-events-none'}`}
    >
    <div ref={buttonRef} className="h-full w-full [transform:translate3d(var(--magnet-x,0px),var(--magnet-y,0px),0)_scale(var(--magnet-scale,1))]">
    <button
      type="button"
      aria-label="Scroll to top"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      disabled={!isVisible}
      onClick={scrollToTop}
      className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#171A1B]/50 bg-[#F1F0E9]/90 text-[#171A1B] backdrop-blur-sm transition-all duration-300 ease-out hover:border-[#171A1B] hover:bg-[#171A1B] hover:text-[#F1F0E9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black motion-reduce:transition-none"
    >
      <ChevronUp aria-hidden="true" size={18} className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 motion-reduce:translate-none motion-reduce:transform-none motion-reduce:transition-none" />
    </button>
    </div>
    </div>
  );
}
