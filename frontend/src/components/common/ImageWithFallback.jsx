import { useState } from 'react';
export default function ImageWithFallback({ src, alt, className = '', children }) {
  const [failed, setFailed] = useState(false);
  return <div className={`relative overflow-hidden ${className}`}>{children}{!failed && <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />}</div>;
}
