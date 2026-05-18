import { SectionLabel } from "./About";

const jobs = [
  {
    role: "Software Engineer",
    company: "Aslase",
    date: "09/2025 — Present",
    location: "Lahore, PK",
    bullets: [
      "Built multi-agent AI productivity platform unifying Gmail, Jira, GitHub, Notion, Drive, Calendar, WhatsApp into one assistant",
      "Designed three-tier memory architecture (Redis + Postgres + pgvector 3072-dim) powering RAG over user docs",
      "Shipped AI-powered LMS with 27 modular NestJS services, HeyGen avatar mock interviews, multi-tenant isolation (95+ tests)",
      "Architected talent assessment pipeline for UAE National Experts Program — government-scale evaluation",
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "CFIT",
    date: "02/2025 — 08/2025",
    location: "Lahore, PK",
    bullets: [
      "Architected Turborepo monorepo with 5 apps for UK transport operators (TMS, WMS, driver/tech/customer mobile)",
      "Built UK taxi platform with AI dispatch + dynamic pricing → 20% revenue lift, 30% faster wait times",
      "Replaced Google Maps API with self-hosted OSRM + Typesense address search on AWS EC2 — eliminated recurring costs",
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "SA Systems",
    date: "11/2022 — 01/2025",
    location: "Lahore, PK",
    bullets: [
      "Built multi-tenant ERP serving 5 housing societies, 3000+ residents, 1000+ employees — 12 integrated modules",
      "Shipped HR & Payroll system for 1000+ employees with biometric integration → 60% faster payroll processing",
      "Delivered Triangle POS for automotive shops with real-time Livewire checkout + Twilio service reminders",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "Devsinc",
    date: "08/2022 — 10/2022",
    location: "Lahore, PK",
    bullets: [
      "Learned MERN stack and product engineering practices under senior engineers in Agile setting",
      "Built task-management module, presented at intern demo, picked up code review + branch workflows",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel index="03" title="experience" />
        <div className="mt-12 relative">
          <div className="absolute left-3 md:left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-border to-transparent" />
          <div className="space-y-10">
            {jobs.map((j, i) => (
              <div key={i} className="relative pl-12 md:pl-16">
                <div className="absolute left-0 md:left-1 top-1.5 size-6 md:size-7 rounded-sm border border-primary bg-background flex items-center justify-center shadow-glow-sm">
                  <span className="size-2 rounded-full bg-primary animate-pulse" />
                </div>
                <div className="border border-border bg-card/60 backdrop-blur-sm rounded-sm p-6 hover:border-primary/50 hover:shadow-glow-sm transition-all">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-sans text-xl font-semibold text-foreground">
                      {j.role}{" "}
                      <span className="text-primary text-glow">@ {j.company}</span>
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
      </div>
    </section>
  );
}
