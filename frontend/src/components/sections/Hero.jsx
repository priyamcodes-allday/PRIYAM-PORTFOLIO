import { Code2, Braces, Database } from "lucide-react";
import Container from "../common/Container";
import ImageWithFallback from "../common/ImageWithFallback";
import useHeroPointer from "../../hooks/useHeroPointer";
export default function Hero() {
  const { portraitRef, buttonAreaRef, buttonRef } = useHeroPointer();
  return (
    <section
      aria-labelledby="hero-title"
      className="pb-16 pt-6 md:pt-10 lg:-mb-8 lg:pb-0"
    >
      <Container>
        <h1
          id="hero-title"
          className="whitespace-nowrap text-center font-['Oswald'] text-[clamp(3rem,17.8vw,17rem)] leading-[1.03] font-medium tracking-[-0.055em]"
        >
          PRIYAM DEB<span className="sr-only"> — Full-Stack Developer</span>
        </h1>
        <div className="relative mt-[-1.5vw] grid items-end gap-8 md:grid-cols-2 md:gap-10 lg:-mx-8 lg:w-[calc(100%+4rem)] lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-6 xl:gap-8">
          <div className="order-2 min-w-0 lg:order-1 lg:w-full lg:max-w-[230px] lg:translate-x-8 lg:-translate-y-2 lg:self-center lg:justify-self-start lg:pb-0 xl:translate-x-12 2xl:translate-x-16">
            <div className="mb-6 flex -space-x-2">
              {[Code2, Braces, Database].map((Icon, i) => (
                <span
                  key={i}
                  className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#F1F0E9] bg-[#d9d8d0]"
                >
                  <Icon size={17} strokeWidth={1.4} />
                </span>
              ))}
            </div>
            <p className="text-xl font-bold uppercase leading-[0.95] tracking-tight md:text-2xl xl:text-3xl">
              Full-Stack
              <br />
              Developer
            </p>
            <p className="mt-4 max-w-md text-sm font-medium leading-relaxed text-black/70 md:text-base lg:max-w-[230px]">
              Building practical web experiences with React, Node.js & MongoDB.
            </p>
          </div>
          <div
            ref={portraitRef}
            className="relative z-10 order-1 mx-auto w-[78vw] max-w-[330px] touch-pan-y origin-center [transform:translate3d(var(--photo-x,0px),var(--photo-y,0px),0)_rotate(var(--photo-rotation,-2deg))] sm:w-[340px] sm:max-w-[460px] md:col-span-2 md:w-[390px] lg:order-2 lg:col-span-1 xl:w-[460px]"
          >
            <ImageWithFallback
              src="/images/profile/profile.png"
              alt="Portrait of Priyam Deb"
              className="aspect-[4/5] overflow-hidden rounded-xl border-2 border-[#F1F0E9] bg-[#cecec5] shadow-sm"
            >
              <div className="absolute inset-0 flex flex-col justify-between p-6 text-[#46483f]">
                <span className="text-[9px] uppercase tracking-[0.25em]">
                  The person behind the code
                </span>
                <div
                  aria-hidden="true"
                  className="relative mx-auto h-[65%] w-full overflow-hidden"
                >
                  <div className="absolute left-1/2 top-3 h-[44%] w-[42%] -translate-x-1/2 rounded-[48%] bg-[#a1a397]" />
                  <div className="absolute -bottom-16 left-1/2 h-[76%] w-[88%] -translate-x-1/2 rounded-t-[48%] bg-[#a1a397]" />
                </div>
                <div className="flex justify-between border-t border-black/20 pt-3 text-[9px] uppercase tracking-widest">
                  <span>Priyam Deb</span>
                  <span>Portrait / coming soon</span>
                </div>
              </div>
            </ImageWithFallback>
          </div>
          <div className="order-3 min-w-0 pb-0 lg:w-full lg:max-w-[300px] lg:-translate-y-4 lg:self-center lg:justify-self-end">
            <p className="max-w-lg text-base leading-relaxed md:text-lg lg:max-w-[300px]">
              Hi, I'm Priyam — a full-stack developer focused on building clean,
              scalable and useful digital products.
            </p>
            <div
              ref={buttonAreaRef}
              className="mt-6 inline-block transition-transform duration-200 motion-reduce:transition-none"
            >
              <a
                ref={buttonRef}
                href="#contact"
                className="inline-flex min-h-12 min-w-[140px] items-center justify-center gap-3 rounded-none border border-[#171A1B] bg-[#171A1B] px-7 py-4 text-sm font-medium text-[#F1F0E9] transition-colors duration-300 ease-out hover:bg-[#F1F0E9] hover:text-[#171A1B] motion-reduce:transition-none [transform:translate3d(var(--magnet-x,0px),var(--magnet-y,0px),0)_scale(var(--magnet-scale,1))]"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
