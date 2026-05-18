import { SectionLabel } from "./About";

const groups = [
  { name: "languages", items: ["TypeScript", "JavaScript", "Python", "PHP", "SQL"] },
  {
    name: "frontend",
    items: ["React 19", "Next.js 16", "Vue 3 / Nuxt", "React Native (Expo)", "Tailwind", "shadcn/ui", "ReactFlow", "ApexCharts"],
  },
  {
    name: "backend",
    items: ["Node.js", "NestJS", "Express.js", "FastAPI", "Laravel", "GraphQL", "WebSockets", "SSE"],
  },
  {
    name: "ai_ml",
    items: ["OpenAI GPT-5", "Multi-agent orchestration", "RAG", "text-embedding-3-large", "pgvector", "HeyGen avatars", "Affinda", "Python ML services"],
  },
  {
    name: "databases",
    items: ["PostgreSQL", "Redis", "MySQL", "MongoDB", "SQL Server", "pgvector", "Typesense"],
  },
  {
    name: "cloud_devops",
    items: ["AWS (EC2/S3/SES)", "Azure (Blob/Speech/VM)", "Docker", "CI/CD", "OSRM self-hosted", "OpenStreetMap"],
  },
  {
    name: "architecture",
    items: ["Microservices", "Turborepo monorepos", "Event-driven (Bull/Celery)", "Multi-tenant SaaS", "OAuth2", "JWT"],
  },
  {
    name: "integrations",
    items: ["Stripe", "Mapbox", "Twilio", "Pusher", "Socket.io", "Playwright", "Puppeteer"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel index="02" title="stack" />
        <div className="grid md:grid-cols-2 gap-4 mt-10">
          {groups.map((g) => (
            <div
              key={g.name}
              className="border border-border bg-card/60 backdrop-blur-sm rounded-sm p-4 sm:p-5 hover:border-primary/50 transition-all group"
            >
              <div className="flex items-center gap-2 font-mono text-xs mb-4">
                <span className="text-accent">▸</span>
                <span className="text-primary">{g.name}</span>
                <span className="text-muted-foreground">.json</span>
                <span className="ml-auto text-muted-foreground">{g.items.length} pkg</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {g.items.map((it) => (
                  <span
                    key={it}
                    className="font-mono text-[11px] border border-border bg-background/60 px-2 py-1 rounded-sm text-foreground/90 hover:border-primary hover:text-primary hover:shadow-glow-sm transition-all cursor-default"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
