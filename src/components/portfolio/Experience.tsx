import { Reveal, Section } from "./ui";

const jobs = [
  {
    role: "Software Engineer",
    company: "Aslase",
    start: "Sep 2025",
    end: "Present",
    bullets: [
      "Sole full-stack developer on Mawaheb, the UAE government talent platform: AI-generated assessments, real-time avatar interviews over WebRTC, and a Skills Observatory dashboard.",
      "Built a multi-agent orchestration layer that routes tasks to role-specific agents, with RAG over user documents on PostgreSQL and pgvector.",
      "Shipped an AI screening pipeline for a hiring SaaS serving 10,000+ monthly users, cutting candidate evaluation from days to minutes.",
      "Delivered an AI LMS of 27 NestJS services and the UAE National Experts Program assessment pipeline, and added a Redis distributed lock so AI scoring runs once across replicas.",
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "CFIT",
    start: "Feb 2025",
    end: "Aug 2025",
    bullets: [
      "Architected a Turborepo of 5 apps for UK transport operators, with 35% faster API responses at 99% uptime.",
      "Replaced paid Google Maps calls with a self-hosted OSRM engine on AWS EC2 and Typesense address search under 100ms.",
      "Built dynamic pricing and AI driver dispatch for a UK taxi platform: 20% more revenue, 30% shorter rider waits.",
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "SA Systems",
    start: "Nov 2022",
    end: "Jan 2025",
    bullets: [
      "Built 12 integrated ERP modules on Laravel, Vue and SQL Server for 5 housing societies, reducing manual work by 70%.",
      "Automated payroll for 1,000+ employees with biometric attendance and T-SQL stored procedures, 60% faster.",
      "Delivered a POS for automotive shops and client e-commerce, booking and corporate sites, including a WebGL 3D tour, as sole developer.",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "Devsinc",
    start: "Aug 2022",
    end: "Oct 2022",
    bullets: [
      "Trained on the MERN stack in an Agile team with code reviews and branch-based Git workflows, and demoed a task-management module.",
    ],
  },
];

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="panel group/list divide-y divide-[var(--glass-border)] rounded-[var(--radius-media)] px-6 md:px-10">
        {jobs.map((j) => (
          <li
            key={j.company}
            className="transition-opacity duration-300 md:group-hover/list:opacity-50 md:hover:opacity-100!"
          >
            <Reveal className="grid grid-cols-1 gap-3 py-8 md:grid-cols-12 md:gap-8 md:py-10">
              <p className="whitespace-nowrap font-mono tabular text-sm text-ink-subtle md:col-span-4 md:pt-1 lg:col-span-3">
                {j.start} <span aria-hidden="true">-</span>
                <span className="sr-only">to</span> {j.end}
              </p>
              <div className="md:col-span-8 lg:col-span-9">
                <h3 className="text-lg font-medium text-ink">
                  {j.role} <span className="text-ink-subtle">at</span> {j.company}
                </h3>
                <ul className="mt-4 space-y-3">
                  {j.bullets.map((b) => (
                    <li
                      key={b}
                      className="relative max-w-[70ch] pl-5 text-[15px] leading-relaxed text-ink-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-[0.7em] h-px w-2.5 bg-line-strong"
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
