export default function SectionLabel({ children, number, className = '' }) {
  return <div className={`flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.16em] md:text-xs ${className}`}><span className="h-1.5 w-1.5 bg-current" /><span>{children}</span>{number && <span className="opacity-45">/ {number}</span>}</div>;
}
