import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Container from "../common/Container";
import useMagneticElement from "../../hooks/useMagneticElement";
const links = ["Home", "About", "Projects", "Contact", "Resume"];
const resumeLinkProps = {
  href: "/resume/Priyam-Deb-Resume.pdf",
  "aria-label": "Open Priyam Deb resume",
};

function ResumeLink({ mobile = false, onClick }) {
  const { buttonAreaRef, buttonRef } = useMagneticElement({ strength: 6 });
  return (
    <div ref={buttonAreaRef} className={mobile ? "w-full" : "shrink-0"}>
      <div ref={buttonRef} className="[transform:translate3d(var(--magnet-x,0px),var(--magnet-y,0px),0)_scale(var(--magnet-scale,1))]">
        <a
          {...resumeLinkProps}
          onClick={onClick}
          className={`group flex cursor-pointer items-center gap-2 rounded-[2px] border border-[#171A1B] bg-[#171A1B] text-xs font-semibold uppercase tracking-[0.12em] text-[#F1F0E9] transition-all duration-300 ease-out hover:bg-[#F1F0E9] hover:text-[#171A1B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171A1B] motion-reduce:transition-none ${mobile ? "w-full justify-between px-5 py-3" : "justify-center px-4 py-2"}`}
        >
          Resume
          <ArrowUpRight aria-hidden="true" size={16} className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:translate-none motion-reduce:transform-none motion-reduce:transition-none" />
        </a>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef(null);
  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 20);
    const root = document.documentElement;
    const hadScrollPadding = root.classList.contains("scroll-pt-20");

    // Leave room for the fixed header when following native anchor links.
    root.classList.add("scroll-pt-20");
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScroll);
      if (!hadScrollPadding) root.classList.remove("scroll-pt-20");
    };
  }, []);
  useEffect(() => {
    const close = (event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const resize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("keydown", close);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("keydown", close);
      window.removeEventListener("resize", resize);
    };
  }, [open]);
  return (
    <div className="h-20">
    <header
      className={`inset-x-0 top-0 z-40 transition-all duration-300 ease-out motion-reduce:transition-none ${
        scrolled
          ? "fixed bg-[#F1F0E9]/90 backdrop-blur-md"
          : "relative bg-transparent"
      }`}
    >
      <Container>
        <div className={`flex items-center justify-between transition-all duration-300 ease-out motion-reduce:transition-none ${scrolled ? "h-16" : "h-20"}`}>
          <a
            href="#home"
            aria-label="Priyam Deb home"
            className="text-2xl font-bold tracking-[-0.08em]"
          >
            PRIYAM
          </a>
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-9 md:flex"
          >
            {links.map((link) => link === "Resume" ? <ResumeLink key={link} /> : (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="border-b border-transparent py-1 text-sm font-semibold uppercase tracking-[0.12em] transition-colors hover:border-black pointer-coarse:inline-flex pointer-coarse:min-h-11 pointer-coarse:items-center"
              >
                {link}
              </a>
            ))}
          </nav>
          <button
            ref={toggle}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
            className="flex h-11 w-11 items-center justify-center p-2 active:bg-black/5 md:hidden"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            aria-hidden={!open}
            inert={!open}
            className={`absolute inset-x-0 top-full max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain bg-[#F1F0E9] px-6 py-6 shadow-sm transition-[opacity,translate,visibility] duration-200 ease-out motion-reduce:transition-none md:hidden ${open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0 pointer-events-none'}`}
          >
            {links.map((link) => link === "Resume" ? <ResumeLink key={link} mobile onClick={() => setOpen(false)} /> : (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-4 text-xl uppercase"
              >
                {link}
                <ArrowUpRight size={18} />
              </a>
            ))}
          </nav>
      </Container>
    </header>
    </div>
  );
}
