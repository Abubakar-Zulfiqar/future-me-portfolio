import portrait from "@/assets/abubakar.webp";
import { spotlightHandlers } from "./spotlight";
import { Reveal, Section } from "./ui";

const facts = [
  {
    label: "Education",
    lines: [
      "M.Phil. Computer Science (2024 - 2026)",
      "B.S. Computer Science (2019 - 2023)",
      "NCBA&E, Lahore",
    ],
  },
  { label: "Languages", lines: ["English, professional working", "Urdu, native"] },
  {
    label: "Based in",
    lines: ["Lahore, Pakistan", "Open to roles in Pakistan and worldwide remote"],
  },
];

export function About() {
  return (
    <Section id="about" title="About">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-4">
          <div
            {...spotlightHandlers(5)}
            className="panel spotlight mx-auto w-full max-w-[360px] rounded-[var(--radius-media)] p-2"
          >
            <img
              src={portrait}
              alt="Portrait of Mian Muhammad Abubakar"
              width={1115}
              height={960}
              loading="lazy"
              decoding="async"
              className="relative aspect-[4/5] w-full rounded-[calc(var(--radius-media)-8px)] object-cover object-[50%_22%]"
            />
          </div>
        </Reveal>

        <div className="space-y-10 lg:col-span-8">
          <Reveal className="space-y-6">
            <p className="text-xl leading-[1.45] tracking-[-0.01em] text-ink md:text-2xl">
              I’m Mian Muhammad Abubakar, a software engineer who ships production systems for
              startups, governments and enterprises across the UK, UAE and Pakistan.
            </p>
            <p className="max-w-[65ch] text-base leading-relaxed text-ink-muted">
              I work across multi-agent AI orchestration, retrieval-augmented generation, real-time
              systems and multi-tenant SaaS. That has meant AI talent platforms for the UAE
              government, hiring software used by 10,000+ people a month, systems that run UK
              transport operators, and an assistant that unifies 7 work apps.
            </p>
            <p className="max-w-[65ch] text-base leading-relaxed text-ink-muted">
              I own delivery end to end: database schema, API design, frontend, and cloud deployment
              on AWS and Azure.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="panel grid grid-cols-1 divide-y divide-[var(--glass-border)] rounded-[var(--radius-card)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {facts.map((f) => (
                <div key={f.label} className="p-5">
                  <dt className="text-sm text-ink-subtle">{f.label}</dt>
                  <dd className="mt-2 space-y-1 text-sm text-ink">
                    {f.lines.map((l) => (
                      <p key={l}>{l}</p>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
