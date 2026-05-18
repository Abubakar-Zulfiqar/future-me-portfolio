import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Contact } from "@/components/portfolio/Contact";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Mian Muhammad Abubakar — Software Engineer · Full-Stack & AI" },
      {
        name: "description",
        content:
          "Software Engineer with 3+ years shipping production-grade full-stack & AI-powered SaaS platforms — multi-agent orchestration, RAG, real-time systems. Used by 10,000+ MAU.",
      },
      { property: "og:title", content: "Mian Muhammad Abubakar — Software Engineer" },
      {
        property: "og:description",
        content: "Full-stack & AI engineer. Multi-agent orchestration, RAG, real-time SaaS.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="scan-line" />
      <Nav />
      <main>
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
