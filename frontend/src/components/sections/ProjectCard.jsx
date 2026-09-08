import { ArrowUpRight } from 'lucide-react';

function validProjectUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return undefined;
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : undefined;
  } catch {
    return undefined;
  }
}

export default function ProjectCard({ project, index }) {
  const liveUrl = validProjectUrl(project.liveUrl);
  const url = liveUrl || validProjectUrl(project.githubUrl);
  const arrow = <ArrowUpRight aria-hidden="true" size={20} strokeWidth={1.4} className="transition-transform duration-300 ease-out group-active/card:-translate-y-0.5 group-focus-visible/card:-translate-y-0.5 group-hover/card:-translate-y-1 group-hover/card:translate-x-1 group-hover/arrow:-translate-y-1.5 group-hover/arrow:translate-x-1.5 motion-reduce:translate-none motion-reduce:transform-none motion-reduce:transition-none" />;
  const content = (
    <>
      <div className="relative flex items-center justify-between gap-4">
        <span className="rounded-[2px] border border-black/35 bg-transparent px-1.5 py-0.5 text-[10px] font-medium text-black/70 transition-colors duration-300 ease-out group-active/card:bg-[#171A1B] group-active/card:text-[#F1F0E9] group-focus-visible/card:bg-[#171A1B] group-focus-visible/card:text-[#F1F0E9] group-hover/card:border-[#171A1B] group-hover/card:bg-[#171A1B] group-hover/card:text-[#F1F0E9] motion-reduce:transition-none">
          {String(index + 1).padStart(2, '0')}
        </span>
        {url ? (
          <span aria-hidden="true" className="group/arrow absolute -right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-black/75 transition-colors duration-300 ease-out hover:text-black motion-reduce:transition-none">
            {arrow}
          </span>
        ) : (
          <span aria-hidden="true" className="pointer-events-none absolute -right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center opacity-30">{arrow}</span>
        )}
      </div>
      <div className="mt-8">
        <h3 className="font-['Oswald'] text-xl font-bold uppercase tracking-tight transition-transform duration-300 ease-out group-hover/card:translate-x-0.5 motion-reduce:translate-none motion-reduce:transform-none motion-reduce:transition-none lg:text-2xl">
          {project.title}
        </h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-black/55">{project.description}</p>
        {project.technologies?.length > 0 && (
          <p className="mt-3 text-xs font-medium uppercase leading-relaxed tracking-wide text-black/45">
            {project.technologies.join(' · ')}
          </p>
        )}
      </div>
    </>
  );
  const cardClasses = 'group/card flex h-full min-h-[220px] flex-col justify-between rounded-xl bg-white/55 p-6 transition-all duration-300 ease-out hover:bg-white/75 active:bg-white/75 focus-visible:bg-white/75 [@media(hover:none)]:motion-safe:active:scale-[0.99] motion-reduce:scale-100 motion-reduce:transition-none lg:min-h-[230px] lg:p-7 xl:min-h-[240px]';

  return (
    <article className={`min-w-0 [overflow-wrap:anywhere] ${index === 0 || index === 3 ? 'lg:col-span-2' : ''}`}>
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`${liveUrl ? `View live ${project.title} project` : `View ${project.title} on GitHub`} (opens in new tab)`} className={`${cardClasses} cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black/50`}>
          {content}
        </a>
      ) : (
        <div className={cardClasses}>{content}</div>
      )}
    </article>
  );
}
