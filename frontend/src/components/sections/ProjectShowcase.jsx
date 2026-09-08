import { useState } from "react";
import { ArrowDownRight } from "lucide-react";
import { projectShowcase } from "../../data/projectShowcase";

function ShowcaseTile({ item, featured }) {
  const [failed, setFailed] = useState(false);
  const className = `group relative block min-w-0 cursor-default overflow-hidden rounded-lg bg-white/5 ${featured ? "aspect-[16/10]" : "aspect-[16/10] md:aspect-[4/3]"}`;
  const content = (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center text-white/40"
      >
        <span className="text-[10px] font-medium tracking-[0.2em]">
          PROJECT PREVIEW
        </span>
        <span className="text-sm md:text-base">{item.title}</span>
      </div>
      {!failed && (
        <img
          src={item.image}
          alt={`${item.title} website preview`}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:scale-100 motion-reduce:transform-none motion-reduce:transition-none"
        />
      )}
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-black/30 px-3 py-2 text-[10px] font-semibold uppercase text-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-black/50 motion-reduce:transition-none md:text-xs">
        {item.category}
      </span>
    </>
  );

  return (
    <div
      role="group"
      aria-label={`${item.title} website preview`}
      className={className}
    >
      {content}
    </div>
  );
}

export default function ProjectShowcase() {
  return (
    <section
      aria-labelledby="showcase-title"
      className="bg-[#050505] pb-16 pt-16 text-[#F1F0E9] md:pb-20 md:pt-24 lg:pb-24 lg:pt-28"
    >
      <div className="mb-8 ml-6 inline-flex -rotate-6 items-center gap-4 md:ml-12 lg:ml-16">
        <h2 id="showcase-title" className="text-sm font-medium text-white/75">
          A closer look at what I’ve built
        </h2>
        <ArrowDownRight
          aria-hidden="true"
          size={28}
          strokeWidth={1.2}
          className="translate-y-3 text-white/60"
        />
      </div>
      <div className="w-full space-y-3 px-4 md:px-3 lg:px-2">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {projectShowcase.slice(0, 2).map((item) => (
            <ShowcaseTile key={item.id} item={item} featured />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {projectShowcase.slice(2).map((item) => (
            <ShowcaseTile key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
