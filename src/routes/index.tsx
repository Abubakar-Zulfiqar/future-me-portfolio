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
          "Software Engineer (3+ yrs) shipping full-stack & AI SaaS — multi-agent orchestration, RAG, real-time systems. Trusted by 10,000+ MAU.",
      },
      { property: "og:title", content: "Mian Muhammad Abubakar — Software Engineer" },
      {
        property: "og:description",
        content: "Full-stack & AI engineer. Multi-agent orchestration, RAG, real-time SaaS.",
      },
      { property: "og:url", content: "https://mian-abubakar.lovable.app/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://mian-abubakar.lovable.app/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Mian Muhammad Abubakar",
          jobTitle: "Software Engineer",
          url: "https://mian-abubakar.lovable.app/",
          email: "mailto:abubakarmian583@gmail.com",
          telephone: "+92-342-4545401",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Lahore",
            addressCountry: "PK",
          },
          knowsAbout: [
            "Full-Stack Development",
            "AI Integration",
            "Multi-Agent Orchestration",
            "Retrieval-Augmented Generation",
            "Real-Time Systems",
            "TypeScript",
            "Node.js",
            "Python",
          ],
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "professional",
            email: "abubakarmian583@gmail.com",
            telephone: "+92-342-4545401",
          },
        }),
      },
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
