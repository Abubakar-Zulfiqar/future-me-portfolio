import { ArrowTopRightIcon, ChevronDownIcon, FileTextIcon } from "@radix-ui/react-icons";
import { documents, trackDownload } from "@/lib/documents";
import { ArchitectureDiagram, type FlowNode } from "./ArchitectureDiagram";
import { spotlightHandlers } from "./spotlight";
import { Reveal, Section, Tag } from "./ui";

type Featured = {
  name: string;
  context: string;
  summary: string;
  impact: string;
  stack: string[];
  flow: FlowNode[];
};

const featured: Featured[] = [
  {
    name: "Mawaheb",
    context: "UAE Department of Government Enablement, sole full-stack developer",
    summary:
      "Talent and career platform spanning 13 use cases: AI-generated assessments, live avatar interviews, and a Skills Observatory comparing workforce demand with supply across emirates and industries.",
    impact:
      "Bilingual AI assessment and interviews on a UAE-hosted backend where no ML credential ever reaches the browser.",
    stack: [
      "Vue 3",
      "Express 5",
      "PostgreSQL",
      "WebSockets",
      "Anam CARA-3",
      "Azure Key Vault",
      "Entra ID",
    ],
    flow: [
      { title: "Vue 3 client", detail: "Assessments, interviews and analytics" },
      { title: "Express 5 proxy", detail: "Entra ID SSO, proxies every ML call" },
      { title: "Azure Key Vault", detail: "Config and short-lived OAuth2 tokens" },
      { title: "ML engine", detail: "WebSocket creation agent and REST scoring" },
      { title: "Avatar interview", detail: "Anam CARA-3 over WebRTC, Azure STT" },
    ],
  },
  {
    name: "AI Employee Agent",
    context: "Aslase, multi-agent productivity platform",
    summary:
      "One assistant over Gmail, Jira, GitHub, Notion, Drive, Calendar and WhatsApp. Agents route the work; RAG supplies the context.",
    impact:
      "Automates email triage, ticket creation, meeting prep and status alerts across 7 work apps.",
    stack: ["NestJS", "React", "PostgreSQL", "pgvector", "OpenAI"],
    flow: [
      { title: "Request", detail: "Chat or ReactFlow workflow editor" },
      { title: "Orchestrator", detail: "Detects complex tasks, routes them" },
      { title: "Role agents", detail: "32 function-calling tools" },
      { title: "RAG knowledge base", detail: "Docs chunked, embedded, searched in pgvector" },
      { title: "7 connected apps", detail: "OAuth integrations, scheduled analyzers" },
    ],
  },
  {
    name: "Recruitment Portal",
    context: "Multi-tenant hiring SaaS, 10,000+ monthly users",
    summary:
      "Screens, tests, interviews and ranks candidates with AI. Tenancy is enforced by company-scoped middleware on every request.",
    impact: "Candidate evaluation cut from days to minutes.",
    stack: ["Express", "TypeScript", "Vue 2", "PostgreSQL", "Bull", "Azure Speech", "Affinda"],
    flow: [
      { title: "CV upload", detail: "Affinda parses it to structured data" },
      { title: "Assessments", detail: "Automated MCQ and coding tests" },
      { title: "Video interview", detail: "Recorded and transcribed" },
      { title: "LLM scoring", detail: "Evaluates interview responses" },
      { title: "Ranked shortlist", detail: "ML job-to-candidate matching" },
    ],
  },
];

type Project = {
  name: string;
  tag: string;
  summary: string;
  details: string;
  impact: string;
  stack: string[];
};

const more: Project[] = [
  {
    name: "AI-Powered LMS",
    tag: "SaaS, multi-tenant",
    summary:
      "27-service NestJS and Vue 3 learning platform with HeyGen-avatar mock interviews and AI career counseling.",
    details:
      "Adaptive learning, mock interviews powered by HeyGen avatars and OpenAI, AI career counseling, ML course generation, skill gap analysis, PDFKit certificates and workforce analytics. Full multi-tenant isolation, with Redis-cached AI recommendations.",
    impact:
      "On-demand AI tutoring and mock interviews, so orgs scale upskilling without adding trainers.",
    stack: ["NestJS", "Vue 3", "PostgreSQL", "Redis", "HeyGen"],
  },
  {
    name: "NEP, UAE National Experts Program",
    tag: "Government pipeline",
    summary:
      "Automated candidate assessment: CV, AI interview, phased MCQs, then a weighted leadership score.",
    details:
      "Evaluates AI expertise, leadership capacity, strategic thinking, growth mindset and ethical leadership. Affinda and a custom ML server parse resumes, followed by a 5-question AI text interview and two phased MCQ rounds. Bull jobs poll the ML server while Socket.io pushes live progress; Puppeteer renders PDF reports.",
    impact:
      "Replaced weeks of manual screening; every candidate scored on the same four-pillar rubric.",
    stack: ["Express", "Bull", "Socket.io", "OpenAI", "Puppeteer"],
  },
  {
    name: "UK Transportation Platform",
    tag: "Monorepo, 5 apps",
    summary:
      "Turborepo of TMS, WMS and driver, technician and customer mobile apps for UK transport operators.",
    details:
      "Job management, automated Stripe invoicing, a finance system with PDF generation, and a Workshop Management System with offline-first mobile inspections. Real-time fleet tracking and 10+ third-party integrations.",
    impact: "99% uptime and 35% faster API responses; replaced disconnected legacy tools.",
    stack: ["Next.js 16", "Convex", "Drizzle", "Expo", "Stripe"],
  },
  {
    name: "AI Assessment Platform",
    tag: "LLM, secure proxy",
    summary:
      "Assessments generated from natural-language prompts, evaluated by AI, with no API keys in the client.",
    details:
      "The Node backend authenticates and proxies every call to an isolated ML server. A WebSocket Creation Agent builds custom assessments from prompts; attempts are processed asynchronously into structured AI performance reports. Azure handles media, email and speech-to-text.",
    impact: "Cut the time recruiters spend writing questionnaires and grading attempts.",
    stack: ["Vue 3", "Express 5", "WebSockets", "Redis", "Entra ID"],
  },
  {
    name: "Assessment Portal",
    tag: "Language, ML scoring",
    summary:
      "Auto-graded English and behavioral tests with speaking, writing, reading and listening recorded in the browser.",
    details:
      "A Python ML server scores each section and normalizes results to a 0 to 100 scale. Recruiters get dashboards for job management, candidate tracking and bulk assignments, with Affinda resume parsing for skill extraction.",
    impact: "Eliminated manual grading; turnaround cut from days to minutes.",
    stack: ["Vue 2", "Express", "PostgreSQL", "Azure STT", "Affinda"],
  },
  {
    name: "UK Taxi Management System",
    tag: "AI dispatch, self-hosted routing",
    summary: "Dynamic pricing, AI driver dispatch, PCI-DSS payments and self-hosted UK routing.",
    details:
      "Payments through Stripe and Wonderful Payments, real-time driver tracking, and apps for operators, drivers and customers. Replaced paid Google Maps calls with an OSRM server on AWS EC2 loaded with the full UK OpenStreetMap region, plus Typesense address autocomplete under 100ms.",
    impact:
      "20% revenue increase, 30% shorter rider wait times, and no more Google Maps API costs.",
    stack: ["Laravel", "Next.js", "MySQL", "OSRM", "Typesense"],
  },
  {
    name: "Enterprise ERP",
    tag: "12 modules",
    summary: "ERP for 5 housing societies with 3,000+ residents and 1,000+ employees.",
    details:
      "HRMS, a 5-level chart of accounts with double-entry ledger, the full procurement cycle from demand to payment, FIFO inventory with barcodes, project management and real estate units. Real-time updates via Socket.io and Pusher.",
    impact: "Reduced manual operational work by 70%.",
    stack: ["Laravel", "Vue", "SQL Server", "OAuth2", "Pusher"],
  },
  {
    name: "HR & Payroll System",
    tag: "1,000+ employees",
    summary:
      "Biometric attendance, leave and full payroll for organizations with 1,000+ employees.",
    details:
      "ZKTeco biometric attendance, accrual-based leave, payroll with overtime, deductions and allowances in T-SQL stored procedures, a recruitment portal, loans and advances, final settlements and 12+ analytics dashboards.",
    impact: "60% faster payroll; no more end-of-month manual reconciliation.",
    stack: ["Laravel", "Vue", "SQL Server", "T-SQL", "ZKTeco"],
  },
  {
    name: "Triangle POS",
    tag: "Point of sale",
    summary:
      "Point of sale for automotive shops with real-time checkout, barcode inventory and SMS reminders.",
    details:
      "Livewire checkout with tax, discounts and partial payments; barcode inventory with stock alerts and multi-unit pricing; six financial reports; Twilio WhatsApp and SMS service reminders.",
    impact: "Replaced paper billing and manual stock tracking with a real-time dashboard.",
    stack: ["Laravel", "Livewire", "MySQL", "Twilio"],
  },
];

const sites = [
  {
    name: "Exclusive Customs",
    what: "UK car-mod store and dealer portal",
    stack: "Next.js, MySQL, PayPal",
    url: "https://exclusivecustoms.co.uk",
  },
  {
    name: "Airbooking",
    what: "Flight and hotel booking with live inventory",
    stack: "Nuxt, Laravel, Stripe",
  },
  {
    name: "BreeO",
    what: "Direct-to-consumer store with content hub",
    stack: "React, Laravel, MySQL",
  },
  {
    name: "SA Systems",
    what: "Corporate site with a custom CMS, still live",
    stack: "Next.js, Laravel",
  },
  {
    name: "SA Gardens",
    what: "Housing society site with a WebGL 3D tour",
    stack: "React, three-fiber",
  },
  {
    name: "Stond",
    what: "Showcase site for a flooring company (retired)",
    stack: "React, Bootstrap",
  },
];

const projectsPdf = documents.find((d) => d.k === "projects")!;

function FeaturedCard({ p, wide }: { p: Featured; wide?: boolean }) {
  const stack = (
    <div className="flex flex-wrap gap-1.5">
      {p.stack.map((s) => (
        <Tag key={s}>{s}</Tag>
      ))}
    </div>
  );
  const impact = (
    <p className="border-l-2 border-accent pl-4 text-[15px] leading-relaxed text-ink">{p.impact}</p>
  );
  return (
    <article
      {...spotlightHandlers(wide ? 1.5 : 3)}
      className="panel spotlight flex w-full flex-col gap-8 rounded-[var(--radius-media)] p-6 md:p-9"
    >
      {wide ? (
        // Wide card: copy in two columns, then the diagram gets the full card width.
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="text-sm text-ink-subtle">{p.context}</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-ink md:text-[1.75rem]">
              {p.name}
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">{p.summary}</p>
          </div>
          <div className="flex flex-col gap-6 lg:pt-7">
            {impact}
            {stack}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-sm text-ink-subtle">{p.context}</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-ink md:text-[1.75rem]">
              {p.name}
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">{p.summary}</p>
          </div>
          {impact}
          {stack}
        </div>
      )}
      <div className={wide ? "" : "mt-auto"}>
        <ArchitectureDiagram
          nodes={p.flow}
          orientation={wide ? "horizontal" : "vertical"}
          label={`${p.name} architecture`}
        />
      </div>
    </article>
  );
}

// Grouped chunks instead of one long hairline list: one divider per cluster.
const clusters = [
  {
    title: "AI and government platforms",
    names: [
      "AI-Powered LMS",
      "NEP, UAE National Experts Program",
      "AI Assessment Platform",
      "Assessment Portal",
    ],
  },
  {
    title: "Transport and logistics",
    names: ["UK Transportation Platform", "UK Taxi Management System"],
  },
  { title: "Enterprise systems", names: ["Enterprise ERP", "HR & Payroll System", "Triangle POS"] },
];

function ProjectItem({ p }: { p: Project }) {
  return (
    <details className="group [&_summary::-webkit-details-marker]:hidden">
      <summary className="cursor-pointer list-none">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h4 className="text-base font-medium text-ink">{p.name}</h4>
            <p className="mt-0.5 text-sm text-ink-subtle">{p.tag}</p>
          </div>
          <ChevronDownIcon
            className="mt-1 size-4 shrink-0 text-ink-subtle transition-transform duration-200 group-open:rotate-180"
            aria-hidden="true"
          />
        </div>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{p.summary}</p>
        <p className="mt-2 text-sm leading-relaxed text-accent-text">{p.impact}</p>
      </summary>
      <div className="mt-4">
        <p className="text-sm leading-relaxed text-ink-subtle">{p.details}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </div>
    </details>
  );
}

export function Projects() {
  return (
    <Section
      id="projects"
      title="Selected work"
      intro="Production systems for governments, startups and enterprises across the UAE, UK and Pakistan."
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Reveal className="lg:col-span-2">
          <FeaturedCard p={featured[0]} wide />
        </Reveal>
        <Reveal delay={0.05} className="flex">
          <FeaturedCard p={featured[1]} />
        </Reveal>
        <Reveal delay={0.15} className="flex">
          <FeaturedCard p={featured[2]} />
        </Reveal>
      </div>

      <div className="mt-20 flex flex-wrap items-baseline justify-between gap-4">
        <h3 className="text-xl font-semibold tracking-[-0.015em] text-ink">More projects</h3>
        <a
          href={projectsPdf.href}
          download={projectsPdf.file}
          onClick={() => trackDownload(projectsPdf.k)}
          className="inline-flex min-h-6 items-center gap-2 text-sm text-ink-subtle transition-colors hover:text-ink"
        >
          <FileTextIcon className="size-4" aria-hidden="true" />
          All 18 case studies (PDF)
        </a>
      </div>
      <div className="mt-8 space-y-12">
        {clusters.map((c) => (
          <Reveal key={c.title}>
            <div className="grid grid-cols-1 gap-6 border-t border-line pt-8 md:grid-cols-12 md:gap-10">
              <h4 className="text-sm font-medium text-ink-subtle md:col-span-3">{c.title}</h4>
              <div className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2 md:col-span-9">
                {c.names.map((n, i) => (
                  <Reveal key={n} delay={i * 0.07}>
                    <ProjectItem p={more.find((m) => m.name === n)!} />
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <h3 className="mt-20 text-xl font-semibold tracking-[-0.015em] text-ink">
        Websites for clients
      </h3>
      <ul
        tabIndex={0}
        aria-label="Websites built for clients, scrolls horizontally"
        className="-mx-4 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-4 pb-3 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
      >
        {sites.map((s) => (
          <li
            key={s.name}
            {...spotlightHandlers(4)}
            className="panel spotlight w-[260px] shrink-0 snap-start rounded-[var(--radius-card)] p-5 sm:w-[300px]"
          >
            {s.url ? (
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-base font-medium text-ink hover:text-accent-text"
              >
                {s.name}
                <ArrowTopRightIcon className="size-3.5" aria-hidden="true" />
              </a>
            ) : (
              <p className="text-base font-medium text-ink">{s.name}</p>
            )}
            <p className="mt-1.5 text-sm leading-snug text-ink-subtle">{s.what}</p>
            <p className="mt-3 font-mono text-xs text-ink-subtle">{s.stack}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
