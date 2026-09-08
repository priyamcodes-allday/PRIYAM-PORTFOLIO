import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Technologies from '../components/sections/Technologies';
import Projects from '../components/sections/Projects';
import ProjectShowcase from '../components/sections/ProjectShowcase';
import Contact from '../components/sections/Contact';
export default function Home() {
  return <div id="home"><a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-50 focus:bg-[#191919] focus:p-4 focus:text-white">Skip to content</a><Navbar /><main id="main-content"><Hero /><div className="bg-[#050505] text-[#F1F0E9]"><Technologies /><About /></div><Projects /><ProjectShowcase /><Contact /></main><Footer /></div>;
}
