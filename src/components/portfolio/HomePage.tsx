import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { About } from "./About";
import { Skills } from "./Skills";
import { Experience } from "./Experience";
import { Projects } from "./Projects";
import { Contact } from "./Contact";

export function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-sm font-mono text-sm"
      >
        Skip to content
      </a>
      <div className="scan-line" aria-hidden="true" />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
