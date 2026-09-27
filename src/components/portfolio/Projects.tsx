import { useState } from "react";
import { SectionLabel } from "./About";

type Project = {
  id: string;
  name: string;
  tag: string;
  summary: string;
  details: string;
  stack: string[];
  impact: string;
  flow?: string[];
  featured?: boolean;
};

const projects: Project[] = [
  {
    id: "01",
    name: "Mawaheb — UAE DGE Talent Platform",
    tag: "government · ai avatars",
    summary:
      "Sole full-stack developer on the UAE government's talent platform: AI-generated assessments, live avatar interviews, and labor-market analytics.",
    details:
      'Built for the UAE Department of Government Enablement, spanning 13 use cases. Talent Assessment uses dynamic questionnaires created by a live ML WebSocket "creation agent" with async media-answer evaluation. AI Interview runs a real-time avatar interviewer (self-hosted DUIX on an Azure GPU VM, later migrated to Anam CARA-3 over WebRTC) with Azure Speech-to-Text and a turn-based ML interview engine. A Skills Observatory dashboard compares workforce demand vs. supply across emirates, industries, and roles. The backend proxies every ML call so no credential reaches the browser; all config comes from Azure Key Vault with short-lived OAuth2 client-credential tokens.',
    stack: [
      "Vue 3",
      "Express 5",
      "Postgres",
      "WebSocket proxy",
      "Anam CARA-3",
      "Azure Key Vault",
      "Entra ID",
    ],
    impact:
      "Bilingual (Arabic/English) AI assessment and interviews on a UAE-hosted, Key Vault-secured backend.",
    flow: [
      "Vue 3 client",
      "Express proxy · Entra ID SSO",
      "Key Vault → OAuth2 token",
      "ML engine (WS + REST)",
      "Avatar interview · WebRTC + STT",
    ],
    featured: true,
  },
  {
    id: "02",
    name: "AI Employee Agent",
    tag: "multi-agent · RAG",
    summary:
      "One assistant over Gmail, Outlook, Jira, GitHub, Notion, Drive, Calendar & WhatsApp — agents route the work, RAG supplies the context.",
    details:
      "A multi-agent orchestration layer auto-detects complex tasks and routes them to role-specific agents, with a ReactFlow visual editor for chaining workflow steps. A three-tier memory architecture (Redis cache, PostgreSQL, pgvector with 3072-dim embeddings) powers RAG over user-uploaded documents and injects relevant context into agent responses. Real-time updates flow over SSE, and cron analyzers watch for stale PRs, Jira blockers, calendar conflicts, and urgent emails.",
    stack: ["Next.js 16", "NestJS", "FastAPI", "pgvector", "Celery", "GPT-5", "32 tools"],
    impact:
      "Unifies 8+ work apps, automating email triage, ticket creation, meeting prep & status alerts.",
    flow: [
      "User request",
      "Orchestrator routes task",
      "Role agents · 32 tools",
      "Memory: Redis → PG → pgvector",
      "8+ apps via OAuth · SSE",
    ],
    featured: true,
  },
  {
    id: "03",
    name: "Recruitment Portal",
    tag: "saas · 10k+ MAU",
    summary:
      "Multi-tenant hiring SaaS that screens, tests, interviews, and ranks candidates with AI — used by 10,000+ people a month.",
    details:
      "Covers the full hiring funnel: Affinda CV parsing into structured data, automated MCQ and coding assessments, video interview recording with transcription, GPT-5 interview evaluation, and a Python ML service for skill extraction and job-to-candidate matching. Multi-tenancy is enforced through company-scoped middleware on every request; auth via JWT with Passport (Google and LinkedIn OAuth).",
    stack: ["Express", "TypeScript", "Vue 2", "Postgres", "Bull", "Azure Speech", "Affinda"],
    impact: "Powers end-to-end hiring for 10,000+ MAU; evaluation cut from days to minutes.",
    flow: [
      "CV upload",
      "Affinda parse",
      "MCQ + coding tests",
      "Video interview → transcript",
      "GPT-5 scoring",
      "Ranked shortlist",
    ],
    featured: true,
  },
  {
    id: "04",
    name: "AI-Powered LMS",
    tag: "saas · multi-tenant",
    summary:
      "27-service NestJS + Vue 3 learning platform with HeyGen-avatar mock interviews and AI career counseling.",
    details:
      "Supports students, faculty, and leadership with adaptive learning, mock interviews powered by HeyGen avatars and GPT-5, AI career counseling, automatic course generation via ML services, skill gap analysis, PDFKit certificates, and workforce analytics dashboards. Full multi-tenant isolation across companies, validated with 95+ unit and end-to-end tests.",
    stack: ["NestJS", "Vue 3", "Postgres 16", "Redis", "HeyGen", "GPT-5", "Azure"],
    impact: "Lets orgs scale upskilling to thousands of learners without growing training teams.",
  },
  {
    id: "05",
    name: "NEP — UAE National Experts Program",
    tag: "government · pipeline",
    summary:
      "Automated candidate assessment for a UAE national program: CV → AI interview → MCQs → weighted leadership score.",
    details:
      "Evaluates candidates across AI expertise, leadership capacity, strategic thinking, growth mindset, and ethical leadership. Resumes are parsed via Affinda and a custom ML server, followed by a 5-question AI text interview, two phased MCQ assessments, and a consolidated leadership score weighted across four pillars. Bull jobs poll the ML server while Socket.io pushes live progress; Puppeteer renders PDF reports.",
    stack: ["Express", "TypeScript", "Postgres", "Bull", "Socket.io", "GPT-5", "Puppeteer"],
    impact:
      "Replaced weeks of manual screening; hundreds of candidates scored on one objective rubric.",
  },
  {
    id: "06",
    name: "UK Transportation Platform",
    tag: "monorepo · 5 apps",
    summary:
      "Turborepo of 5 apps running UK transport operators — TMS, WMS, and driver/technician/customer mobile apps.",
    details:
      "Job management, automated Stripe invoicing, a finance system with PDF generation, and a Workshop Management System with offline-first mobile inspections. Fleet management includes real-time tracking, with 10+ third-party integrations.",
    stack: ["Next.js 16", "Convex", "Drizzle", "Expo 54", "Stripe", "Mapbox"],
    impact: "99% uptime, 35% faster API responses; replaced disconnected legacy tools.",
  },
  {
    id: "07",
    name: "AI Assessment Platform",
    tag: "llm · secure proxy",
    summary:
      "LLM-generated assessments from natural-language prompts, with AI-evaluated results and zero API keys in the client.",
    details:
      'The Node.js backend acts as an authenticated proxy to an isolated ML server. A real-time WebSocket proxy powers an interactive "Creation Agent" that generates customized assessments from prompts. Candidate attempts are processed asynchronously into structured AI performance reports. Azure handles media storage, email, and speech-to-text; sign-in via MSAL (Entra ID SSO).',
    stack: ["Vue 3", "Express 5", "WebSockets", "Bull", "Redis", "Azure", "Entra ID"],
    impact: "Cut the time recruiters spend writing questionnaires and grading attempts by hand.",
  },
  {
    id: "08",
    name: "Assessment Portal",
    tag: "language · ml scoring",
    summary:
      "Auto-graded English and behavioral tests — speaking, writing, reading, listening — recorded in the browser.",
    details:
      "Candidates complete multi-section tests (MCQ, speaking, writing, reading, listening) with in-browser audio recording. The backend pushes responses to a Python ML server that scores each section and normalizes results to 0–100. Recruiters get dashboards for job management, candidate tracking, and bulk assignments, with Affinda resume parsing for skill extraction.",
    stack: ["Vue 2", "Vuetify", "Express", "Postgres", "Azure STT", "Affinda", "OpenAI"],
    impact: "Eliminated manual grading; turnaround cut from several days to a few minutes.",
  },
  {
    id: "09",
    name: "UK Taxi Management System",
    tag: "ai dispatch · payments",
    summary:
      "Taxi platform with dynamic pricing, AI driver dispatch, and PCI-DSS-compliant payments.",
    details:
      "Intelligent dynamic pricing, AI dispatch that optimizes driver assignment, and a payment layer integrating Stripe and Wonderful Payments with PCI-DSS compliance. Real-time driver tracking, automated email notifications, and frontends for operators, drivers, and customers.",
    stack: ["Laravel", "React", "Vue", "Next.js", "MySQL", "Redis", "Stripe"],
    impact: "20% revenue increase from dynamic pricing · 30% shorter rider wait times.",
  },
  {
    id: "10",
    name: "Self-Hosted OSRM + Typesense",
    tag: "infrastructure",
    summary:
      "Replaced paid Google Maps calls with self-hosted UK routing and sub-100ms address search.",
    details:
      "Deployed an OSRM server on AWS EC2 computing distances between lat/long points, imported the full UK region from OpenStreetMap, wrote Python tooling to convert OSM data to JSON, and ingested it into a Typesense addresses collection for in-app autocomplete.",
    stack: ["AWS EC2", "OSRM", "OpenStreetMap", "Python", "Typesense", "Nginx"],
    impact: "Eliminated recurring Google Maps costs; full control over routing data.",
  },
  {
    id: "11",
    name: "Enterprise ERP System",
    tag: "erp · 12 modules",
    summary: "12-module ERP for 5 housing societies with 3,000+ residents and 1,000+ employees.",
    details:
      "Modules include HRMS, a 5-level Chart of Accounts with double-entry ledger, a full procurement cycle (demand → quotation → PO → GRN → invoice → payment), FIFO inventory with barcodes, project management, and real estate units. Real-time updates via Socket.io and Pusher.",
    stack: ["Laravel", "Vue", "SQL Server", "OAuth2", "Socket.io", "Pusher"],
    impact: "Reduced manual operational work by 70%.",
  },
  {
    id: "12",
    name: "HR & Payroll System",
    tag: "hrms · 1000+ employees",
    summary:
      "Biometric attendance, leave, and full payroll for organizations with 1,000+ employees.",
    details:
      "ZKTeco biometric attendance, leave management with accrual rules, payroll covering overtime, deductions, and allowances (T-SQL stored procedures), a recruitment portal with interview scheduling, loans and advances, final settlements, and 12+ analytics dashboards.",
    stack: ["Laravel", "Vue", "SQL Server", "T-SQL", "ZKTeco SDK", "ApexCharts"],
    impact: "60% faster payroll processing; no more end-of-month manual reconciliation.",
  },
  {
    id: "13",
    name: "Triangle POS",
    tag: "pos · livewire",
    summary:
      "Point-of-sale for automotive shops with real-time checkout, barcode inventory, and SMS reminders.",
    details:
      "Livewire-driven checkout with cart, tax/discount handling, and partial payments; barcode inventory with stock alerts and multi-unit pricing; 6 reports (P&L, Sales, Purchases, Returns, Payments); Twilio WhatsApp/SMS service reminders.",
    stack: ["Laravel", "Livewire", "MySQL", "Twilio", "DomPDF", "Barcode"],
    impact: "Replaced paper billing and manual stock tracking with a real-time dashboard.",
  },
];

type Site = { name: string; what: string; stack: string; url?: string; note?: string };

const sites: Site[] = [
  {
    name: "Exclusive Customs",
    what: "UK car-mod e-commerce + dealer portal, replacing a failing WordPress store",
    stack: "Next.js · MySQL · PayPal",
    url: "https://exclusivecustoms.co.uk",
  },
  {
    name: "Airbooking System",
    what: "Flight & hotel booking with live third-party inventory and Stripe payments",
    stack: "Nuxt · Laravel · Stripe",
  },
  {
    name: "BreeO",
    what: "D2C brand store for a detergent brand — catalog, bundles, COD, content hub, admin",
    stack: "React · Laravel · MySQL",
  },
  {
    name: "SA Systems website",
    what: "Corporate site off WordPress with SEO and a custom CMS admin — still live",
    stack: "Next.js · Laravel · GTM",
  },
  {
    name: "SA Gardens",
    what: "Housing society site with an in-browser WebGL 3D virtual tour",
    stack: "React · three-fiber · drei",
  },
  {
    name: "Stond",
    what: "Showcase site for a tiles & flooring company",
    stack: "React · Bootstrap",
    note: "retired",
  },
];

const INITIAL = 6;

function Flow({ steps }: { steps: string[] }) {
  return (
    <figure className="mt-4">
      <figcaption className="font-mono text-[11px] text-muted-foreground mb-2">
        <span className="text-accent">▸</span> architecture
      </figcaption>
      <ol className="flex flex-wrap items-center gap-y-2 font-mono text-[11px]">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center">
            <span className="border border-primary/40 bg-primary/5 text-foreground px-2 py-1 rounded-sm">
              {s}
            </span>
            {i < steps.length - 1 && (
              <span aria-hidden="true" className="text-primary px-1.5">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function Projects() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? projects : projects.slice(0, INITIAL);

  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel index="04" title="projects" />
        <p className="mt-6 font-mono text-sm text-muted-foreground max-w-2xl">
          <span className="text-accent">$</span> ls -la /career &nbsp;
          <span className="text-primary">
            // {projects.length + sites.length} production systems shipped
          </span>
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {visible.map((p) => (
            <article
              key={p.id}
              className={`group relative flex flex-col border border-border bg-card/60 backdrop-blur-sm rounded-sm p-4 sm:p-6 hover:border-primary/60 hover:shadow-glow-sm transition-all ${
                p.id === "01" ? "md:col-span-2" : ""
              }`}
            >
              <div className="mb-3">
                <div className="font-mono text-xs text-accent">
                  project_{p.id}.md{" "}
                  {p.featured && <span className="text-primary ml-2">★ featured</span>}
                </div>
                <h3 className="font-sans text-xl font-semibold text-foreground mt-1 group-hover:text-primary transition-colors">
                  {p.name}
                </h3>
                <div className="font-mono text-xs text-primary/70 mt-0.5">{p.tag}</div>
              </div>

              <p className="font-mono text-sm text-foreground/85 leading-relaxed">{p.summary}</p>

              {p.flow && <Flow steps={p.flow} />}

              <div className="mt-4 flex flex-wrap gap-1">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[11px] text-primary/80 border border-primary/20 px-1.5 py-0.5 rounded-sm bg-primary/5"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <details className="mt-4 group/details">
                <summary className="cursor-pointer list-none font-mono text-xs text-muted-foreground hover:text-primary transition-colors [&::-webkit-details-marker]:hidden">
                  <span className="text-accent group-open/details:hidden">+</span>
                  <span className="text-accent hidden group-open/details:inline">−</span> cat
                  details.md
                </summary>
                <p className="mt-3 font-mono text-sm text-muted-foreground leading-relaxed">
                  {p.details}
                </p>
              </details>

              <div className="mt-auto pt-4">
                <div className="pt-4 border-t border-dashed border-border font-mono text-xs">
                  <span className="text-accent">▸ impact:</span>{" "}
                  <span className="text-foreground/90">{p.impact}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {projects.length > INITIAL && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              aria-expanded={showAll}
              className="font-mono text-sm border border-border text-foreground px-5 py-2.5 rounded-sm hover:border-primary hover:text-primary transition-colors"
            >
              <span className="text-accent">$</span>{" "}
              {showAll ? "collapse --projects" : `show --all (${projects.length - INITIAL} more)`}
            </button>
          </div>
        )}

        <div className="mt-14">
          <h3 className="font-mono text-xs text-muted-foreground mb-4 font-normal">
            <span className="text-accent">▸</span>{" "}
            <span className="text-primary">client_websites</span>
            <span>.log</span>
          </h3>
          <ul className="border border-border bg-card/60 backdrop-blur-sm rounded-sm divide-y divide-border">
            {sites.map((s) => (
              <li
                key={s.name}
                className="px-4 py-3 font-mono text-sm grid sm:grid-cols-12 gap-1 sm:gap-4 items-baseline"
              >
                <span className="sm:col-span-3 text-foreground">
                  {s.url ? (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-primary hover:underline"
                    >
                      {s.name} <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    s.name
                  )}
                  {s.note && (
                    <span className="ml-2 text-[11px] text-muted-foreground">[{s.note}]</span>
                  )}
                </span>
                <span className="sm:col-span-6 text-muted-foreground text-xs sm:text-sm">
                  {s.what}
                </span>
                <span className="sm:col-span-3 text-primary/70 text-xs sm:text-right">
                  {s.stack}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 font-mono text-xs text-muted-foreground">
          <span className="text-accent">$</span> full case studies →{" "}
          <a href="#docs" className="text-primary hover:underline">
            projects.pdf
          </a>
        </p>
      </div>
    </section>
  );
}
