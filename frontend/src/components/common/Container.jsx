export default function Container({ children, className = '' }) {
  return <div className={`mx-auto w-full max-w-[1600px] px-6 md:px-12 lg:px-16 ${className}`}>{children}</div>;
}
