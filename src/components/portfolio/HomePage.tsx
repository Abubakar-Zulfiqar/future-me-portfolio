import { MotionConfig } from "motion/react";
import { ErrorBoundary } from "./ErrorBoundary";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { ParticleField } from "./ParticleField";
import { Story } from "./Story";
import { Projects } from "./Projects";
import { Experience } from "./Experience";
import { Skills } from "./Skills";
import { About } from "./About";
import { Contact } from "./Contact";

// Order follows how reviewers read a portfolio: who you are, proof (work, experience), then detail.
export function HomePage() {
  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <div className="relative min-h-[100dvh] overflow-x-clip">
          <div aria-hidden="true" className="aurora" />
          <ParticleField />
          <div aria-hidden="true" className="grain" />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-[var(--radius-control)] focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-on-accent"
          >
            Skip to content
          </a>
          <Nav />
          <main id="main">
            <Hero />
            <Story />
            <Projects />
            <Experience />
            <Skills />
            <About />
            <Contact />
          </main>
        </div>
      </MotionConfig>
    </ErrorBoundary>
  );
}
