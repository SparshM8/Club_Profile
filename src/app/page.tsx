import About from "@/components/About";
import CursorLoader from "@/components/CursorLoader";
import Events from "@/components/Events";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Join from "@/components/Join";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import WhatWeDo from "@/components/WhatWeDo";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#05060a]">
      <div className="aurora" />
      <CursorLoader />
      <Navbar />
      <main id="content" className="snap-root relative z-10">
        <Hero />
        <About />
        <WhatWeDo />
        <Events />
        <Projects />
        <Join />
        <Footer />
      </main>
    </div>
  );
}
