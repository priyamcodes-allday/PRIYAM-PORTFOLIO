import { useRef } from 'react';
import CustomCursor from './components/common/CustomCursor';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ScrollToTop from './components/common/ScrollToTop';
import ScrollToTopButton from './components/common/ScrollToTopButton';
import PageIntro from './components/common/PageIntro';

export default function App() {
  const scopeRef = useRef(null);
  return <div ref={scopeRef} className="overflow-x-hidden bg-[#F1F0E9] font-['Inter'] text-[#191919] selection:bg-[#191919] selection:text-[#F1F0E9] [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-4 [&_button]:focus-visible:outline-2 [&_button]:focus-visible:outline-offset-4"><PageIntro /><CustomCursor scopeRef={scopeRef} /><ScrollToTop /><Routes><Route path="/" element={<Home />} /><Route path="*" element={<div className="min-h-screen p-12"><h1 className="text-4xl">Page not found</h1><a href="/" className="mt-8 inline-block underline">Return home ↗</a></div>} /></Routes><ScrollToTopButton /></div>;
}
