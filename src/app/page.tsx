import Nav from "@/components/Nav";
import Hero from "@/components/hero/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Work from "@/components/sections/Work";
import Skills from "@/components/sections/Skills";
import Awards from "@/components/sections/Awards";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Work />
        <Skills />
        <Awards />
        <Contact />
      </main>
    </>
  );
}
