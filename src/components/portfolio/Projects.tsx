import { SectionLabel } from "./About";

type Project = {
  id: string;
  name: string;
  tag: string;
  summary: string;
  stack: string[];
  impact: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    id: "01",
    name: "AI Employee Agent",
    tag: "multi-agent · RAG",
    summary:
      "Multi-agent productivity platform unifying Gmail, Outlook, Jira, GitHub, Notion, Drive, Calendar & WhatsApp into one assistant with a ReactFlow visual workflow editor and three-tier memory (Redis + Postgres + pgvector).",
    stack: ["Next.js 16", "NestJS", "FastAPI", "pgvector", "Celery", "GPT-5", "32 tools"],
    impact: "Saves users hours of busywork daily by automating triage, ticket creation & meeting prep.",
    featured: true,
  },
  {
    id: "02",
    name: "AI-Powered LMS",
    tag: "saas · multi-tenant",
    summary:
      "27 modular NestJS services + Vue 3 frontend with adaptive learning, HeyGen avatar mock interviews, AI career counseling, ML course generation, and skill gap analysis. Validated with 95+ unit & E2E tests.",
    stack: ["NestJS", "Vue 3", "Postgres 16", "Redis", "HeyGen", "GPT-5", "Azure"],
    impact: "Lets orgs scale workforce upskilling to thousands of learners without growing training teams.",
    featured: true,
  },
  {
    id: "03",
    name: "NEP — UAE Govt Talent Platform",
    tag: "government · pipeline",
    summary:
      "Talent assessment platform for UAE National Experts Program. Resume parsing → AI text interview → phased MCQs → consolidated 4-pillar leadership score, with Bull jobs polling ML server and Socket.io live progress.",
    stack: ["Express", "TypeScript", "Postgres", "Bull", "Socket.io", "GPT-5", "Affinda"],
    impact: "Replaced weeks of manual screening with automated multi-stage evaluation at national scale.",
  },
  {
    id: "04",
    name: "Recruitment & Assessment Portal",
    tag: "saas · 10k+ MAU",
    summary:
      "Multi-tenant HR SaaS with AI candidate screening, in-browser audio assessments (MCQ, speaking, writing, reading, listening), GPT-5 interview evaluation, video transcription, and intelligent candidate ranking.",
    stack: ["Vue 2", "Express", "Postgres", "Azure Speech", "Affinda", "OpenAI"],
    impact: "Powers end-to-end hiring for 10,000+ MAU; evaluation cut from days to minutes.",
    featured: true,
  },
  {
    id: "05",
    name: "UK Transportation Platform",
    tag: "monorepo · 5 apps",
    summary:
      "Turborepo with 5 apps: TMS, WMS, and dedicated React Native apps for drivers, technicians, and customers. Offline-first workshop inspections, automated Stripe invoicing, 10+ third-party integrations.",
    stack: ["Next.js 16", "Convex", "Drizzle", "Expo 54", "Stripe", "Mapbox"],
    impact: "99% uptime, 35% faster API responses; unified disconnected legacy tools for UK operators.",
  },
  {
    id: "06",
    name: "UK Taxi Management System",
    tag: "ai dispatch · payments",
    summary:
      "End-to-end taxi platform with intelligent dynamic pricing, AI dispatch optimizing driver assignment, and PCI-DSS-compliant Stripe + Wonderful Payments. Multi-app frontends for operators, drivers & customers.",
    stack: ["Laravel", "React", "Vue", "Next.js", "MySQL", "Redis", "Stripe"],
    impact: "20% revenue lift from dynamic pricing · 30% faster wait times via AI dispatch.",
  },
  {
    id: "07",
    name: "Self-Hosted OSRM + Typesense",
    tag: "infrastructure",
    summary:
      "Replaced expensive Google Maps API with OSRM server on AWS EC2 computing lat/long distances, plus a Typesense addresses collection built from OpenStreetMap UK data for sub-100ms autocomplete.",
    stack: ["AWS EC2", "OSRM", "OpenStreetMap", "Python", "Typesense", "Nginx"],
    impact: "Eliminated recurring Google Maps costs; full routing-data control + sub-100ms search.",
  },
  {
    id: "08",
    name: "Enterprise ERP System",
    tag: "erp · 12 modules",
    summary:
      "Multi-tenant ERP serving 5 housing societies with 3000+ residents & 1000+ employees. 12 modules including HRMS, 5-level Chart of Accounts, full procurement cycle, FIFO inventory & real estate units.",
    stack: ["Laravel", "Vue", "SQL Server", "OAuth2", "Socket.io", "Pusher"],
    impact: "Reduced manual operational work by 70% across daily housing-society operations.",
  },
  {
    id: "09",
    name: "Triangle POS",
    tag: "pos · livewire",
    summary:
      "Modular POS for automotive service shops — real-time Livewire checkout with tax/discount/partial payments, barcode inventory, stock alerts, 6 reports (P&L, Sales, Purchases, Returns, Payments), Twilio service reminders.",
    stack: ["Laravel", "Livewire", "MySQL", "Twilio", "DomPDF", "Barcode"],
    impact: "Replaced paper billing with real-time shop visibility; dramatically reduced bookkeeping effort.",
  },
  {
    id: "10",
    name: "HR & Payroll System",
    tag: "hrms · 1000+ employees",
    summary:
      "End-to-end HRMS with biometric attendance, accrual leave management, full payroll (overtime/deductions/allowances), recruitment portal, loans & advances, final settlements, 12+ analytics dashboards.",
    stack: ["Laravel", "Vue", "SQL Server", "T-SQL", "ZKTeco SDK", "ApexCharts"],
    impact: "Reduced payroll processing time by 60%; eliminated end-of-month manual reconciliation.",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel index="04" title="projects" />
        <p className="mt-6 font-mono text-sm text-muted-foreground max-w-2xl">
          <span className="text-accent">$</span> ls -la /career &nbsp;
          <span className="text-primary">// {projects.length} production systems shipped</span>
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <article
              key={p.id}
              className={`group relative border border-border bg-card/60 backdrop-blur-sm rounded-sm p-6 hover:border-primary/60 hover:shadow-glow-sm transition-all ${
                p.featured ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="font-mono text-[11px] text-accent">
                    project_{p.id}.md {p.featured && <span className="text-primary ml-2">★ featured</span>}
                  </div>
                  <h3 className="font-sans text-xl font-semibold text-foreground mt-1 group-hover:text-primary group-hover:text-glow transition-colors">
                    {p.name}
                  </h3>
                  <div className="font-mono text-xs text-primary/70 mt-0.5">{p.tag}</div>
                </div>
                <span className="font-mono text-2xl text-primary/30 group-hover:text-primary group-hover:text-glow transition-all">
                  ↗
                </span>
              </div>

              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                {p.summary}
              </p>

              <div className="mt-4 flex flex-wrap gap-1">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[10px] text-primary/80 border border-primary/20 px-1.5 py-0.5 rounded-sm bg-primary/5"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-dashed border-border font-mono text-xs">
                <span className="text-accent">▸ impact:</span>{" "}
                <span className="text-foreground/90">{p.impact}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
