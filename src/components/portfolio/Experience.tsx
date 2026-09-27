import { SectionLabel } from "./About";

const jobs = [
  {
    role: "Software Engineer",
    company: "Aslase",
    date: "09/2025 — Present",
    location: "Lahore, PK",
    bullets: [
      "Sole full-stack developer on Mawaheb, the UAE DGE talent platform: AI-generated assessments, real-time avatar interviews (Anam CARA-3 over WebRTC), and a Skills Observatory dashboard",
      "Built a multi-agent orchestration layer routing tasks to role-specific agents, plus a ReactFlow workflow editor chaining steps across 8+ apps (Gmail, Jira, GitHub, Notion, Calendar)",
      "Designed a three-tier memory system (Redis + Postgres + pgvector 3072-dim) powering RAG over user docs, with cron analyzers flagging stale PRs, Jira blockers, and calendar conflicts",
      "Shipped an AI screening pipeline (Affinda CV parsing, GPT interview scoring, video transcription, ranking) for a hiring SaaS serving 10,000+ MAU — evaluation cut from days to minutes",
      "Delivered an AI LMS (27 NestJS services + Vue 3) with HeyGen avatar mock interviews and AI career counseling, validated by 95+ unit & E2E tests for multi-tenant isolation",
      "Built the UAE National Experts Program pipeline: CV parsing → AI text interview → phased MCQs → weighted four-pillar leadership score, with Bull jobs and Socket.io progress",
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "CFIT",
    date: "02/2025 — 08/2025",
    location: "Lahore, PK",
    bullets: [
      "Architected a Turborepo monorepo of 5 apps for UK transport operators (TMS, WMS, driver/technician/customer React Native apps) — 35% faster API responses at 99% uptime",
      "Replaced paid Google Maps calls with a self-hosted OSRM engine on AWS EC2 (full UK OpenStreetMap data) and sub-100ms Typesense address autocomplete",
      "Built UK taxi platform dynamic pricing + AI driver dispatch → 20% revenue increase, 30% shorter rider wait times",
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "SA Systems",
    date: "11/2022 — 01/2025",
    location: "Lahore, PK",
    bullets: [
      "Built 12 integrated ERP modules (HRMS, double-entry accounting, procurement, FIFO inventory) on Laravel, Vue & SQL Server for 5 housing societies with 3,000+ residents — 70% less manual work",
      "Automated payroll for 1,000+ employees (overtime, deductions, ZKTeco biometric attendance) with T-SQL stored procedures → 60% faster payroll processing",
      "Delivered Triangle POS for automotive shops plus client e-commerce, booking, and corporate sites (incl. a WebGL 3D virtual tour) as sole developer",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "Devsinc",
    date: "08/2022 — 10/2022",
    location: "Lahore, PK",
    bullets: [
      "Trained on the MERN stack in an Agile team under senior engineers, working with code reviews and branch-based Git workflows",
      "Built and demoed a task-management module (REST API + React UI) at the intern demo",
    ],
  },
];

const education = [
  { degree: "M.Phil. Computer Science", school: "NCBA&E, Lahore", date: "2024 — 2026" },
  { degree: "B.S. Computer Science", school: "NCBA&E, Lahore", date: "2019 — 2023" },
];

export function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel index="03" title="experience" />
        <div className="mt-12 relative">
          <div className="absolute left-3 md:left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-border to-transparent" />
          <div className="space-y-8 sm:space-y-10">
            {jobs.map((j, i) => (
              <div key={i} className="relative pl-10 sm:pl-12 md:pl-16">
                <div className="absolute left-0 md:left-1 top-1.5 size-6 md:size-7 rounded-sm border border-primary bg-background flex items-center justify-center shadow-glow-sm">
                  <span className="size-2 rounded-full bg-primary animate-pulse" />
                </div>
                <div className="border border-border bg-card/60 backdrop-blur-sm rounded-sm p-4 sm:p-6 hover:border-primary/50 hover:shadow-glow-sm transition-all">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-sans text-lg sm:text-xl font-semibold text-foreground break-words">
                      {j.role} <span className="text-primary text-glow">@ {j.company}</span>
                    </h3>
                    <div className="font-mono text-xs text-accent">{j.date}</div>
                  </div>
                  <div className="font-mono text-xs text-muted-foreground mt-1">
                    <span className="text-accent">$</span> location: {j.location}
                  </div>
                  <ul className="mt-4 space-y-2 font-mono text-sm text-muted-foreground">
                    {j.bullets.map((b, k) => (
                      <li key={k} className="flex gap-3 leading-relaxed">
                        <span className="text-primary mt-0.5">▸</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <div className="font-mono text-xs text-muted-foreground mb-4">
            <span className="text-accent">▸</span> <span className="text-primary">education</span>
            <span>.log</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {education.map((e) => (
              <div
                key={e.degree}
                className="border border-border bg-card/60 backdrop-blur-sm rounded-sm p-4 sm:p-5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-sans text-lg font-semibold text-foreground">{e.degree}</h3>
                  <span className="font-mono text-xs text-accent">{e.date}</span>
                </div>
                <div className="font-mono text-xs text-muted-foreground mt-1">{e.school}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
