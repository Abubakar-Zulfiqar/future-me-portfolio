import { Reveal, Section } from "./ui";

const groups = [
  {
    name: "AI and ML",
    items: [
      "OpenAI GPT-5",
      "Multi-agent orchestration",
      "RAG",
      "text-embedding-3-large",
      "pgvector",
      "HeyGen",
      "Anam CARA-3",
      "Azure Speech",
      "Affinda",
      "Python ML services",
    ],
  },
  {
    name: "Frontend",
    items: [
      "React 19",
      "Next.js 16",
      "Vue 3, Nuxt",
      "React Native (Expo)",
      "Tailwind",
      "shadcn/ui",
      "ReactFlow",
      "Three.js, r3f",
    ],
  },
  {
    name: "Backend",
    items: [
      "Node.js",
      "NestJS",
      "Express",
      "FastAPI",
      "Laravel",
      "Livewire",
      "GraphQL",
      "WebSockets",
      "SSE",
    ],
  },
  { name: "Languages", items: ["TypeScript", "JavaScript", "Python", "PHP", "SQL"] },
  {
    name: "Databases",
    items: ["PostgreSQL", "Redis", "MySQL", "MongoDB", "SQL Server", "pgvector", "Typesense"],
  },
  {
    name: "Cloud and DevOps",
    items: [
      "AWS (EC2, S3, SES, Transcribe)",
      "Azure (Blob, Speech, VMs, Key Vault)",
      "Docker",
      "CI/CD",
      "Self-hosted OSRM",
    ],
  },
  {
    name: "Architecture",
    items: [
      "Microservices",
      "Turborepo monorepos",
      "Event-driven (Bull, Celery)",
      "Multi-tenant SaaS",
      "Clean Architecture",
      "OAuth2, Entra ID, JWT",
    ],
  },
  {
    name: "Integrations",
    items: [
      "Stripe",
      "PayPal",
      "Mapbox",
      "Twilio",
      "Pusher",
      "Socket.io",
      "Playwright",
      "Puppeteer",
    ],
  },
];

export function Skills() {
  return (
    <Section
      id="skills"
      title="Stack"
      intro="The tools behind the systems above, grouped by layer."
    >
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-media)] border border-[var(--glass-border)] bg-[var(--glass-border)] shadow-[var(--glass-shadow)] lg:grid-cols-4">
        {groups.map((g, i) => (
          <Reveal
            key={g.name}
            delay={(i % 4) * 0.06}
            className="min-w-0 bg-bg/75 p-4 backdrop-blur-xl sm:p-6"
          >
            <h3 className="text-sm font-medium text-ink">{g.name}</h3>
            <ul className="mt-4 space-y-2">
              {g.items.map((it) => (
                <li
                  key={it}
                  className="break-words font-mono text-xs leading-snug text-ink-subtle sm:text-[13px]"
                >
                  {it}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
