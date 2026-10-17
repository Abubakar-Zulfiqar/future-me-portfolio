import { ArrowRightIcon } from "@radix-ui/react-icons";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { btn } from "./buttons";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Text that comes into focus (blur to sharp) as its stage scrolls in, matching the particle morph. */
function Focus({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, filter: "blur(14px)", y: 18 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: false, amount: 0.6 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const metrics = [
  { value: "4+", label: "Years shipping production software" },
  { value: "10,000+", label: "Monthly users on AI pipelines I built" },
  { value: "18", label: "Production systems shipped" },
  { value: "2", label: "UAE government AI platforms" },
];

/**
 * Two scroll stages between the hero and the work. The particle layer re-forms for each one:
 * a spiral (orchestrator core, agent arms) for "agents", then a brain for "production".
 * Their ids are scroll anchors read by particleScene.ts.
 */
export function Story() {
  return (
    <>
      <section
        id="story-agents"
        aria-labelledby="story-agents-title"
        className="relative flex min-h-[115dvh] flex-col px-4 pt-[16vh] sm:px-6"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center text-center">
          <Focus className="scrim legible">
            <h2
              id="story-agents-title"
              className="text-4xl font-light leading-[1.05] tracking-[-0.045em] text-ink sm:text-6xl lg:text-7xl"
            >
              Agents that route
              <br className="hidden sm:block" /> the work.
            </h2>
          </Focus>
          <Focus delay={0.12} className="scrim legible">
            <p className="mx-auto mt-6 max-w-[48ch] text-base leading-relaxed text-ink-muted sm:text-lg">
              Multi-agent orchestration, RAG over pgvector and real-time pipelines, running in
              production for governments and startups.
            </p>
          </Focus>
          <div className="flex-1" />
          <dl className="scrim legible mb-10 grid w-full grid-cols-2 border-t border-[var(--glass-border)] text-left md:grid-cols-4">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className={`py-5 pr-4 md:py-6 ${i > 0 ? "md:border-l md:border-[var(--glass-border)] md:pl-6" : ""} ${
                  i % 2 === 1 ? "border-l border-[var(--glass-border)] pl-4" : ""
                }`}
              >
                <dt className="sr-only">{m.label}</dt>
                <dd className="font-mono tabular text-3xl font-light tracking-[-0.03em] text-ink md:text-4xl">
                  {m.value}
                </dd>
                <dd aria-hidden="true" className="mt-1.5 text-sm leading-snug text-ink-subtle">
                  {m.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        id="story-brain"
        aria-labelledby="story-brain-title"
        className="relative flex min-h-[100dvh] flex-col px-4 pt-[16vh] pb-[10vh] sm:px-6"
      >
        <div className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 content-between gap-10 md:grid-cols-12">
          <Focus className="scrim legible md:col-span-5">
            <p className="max-w-[36ch] text-base leading-relaxed text-ink-muted">
              AI talent platforms for the UAE government, hiring SaaS used by 10,000+ people a
              month, and an assistant that spans 7 work apps.
            </p>
          </Focus>
          <Focus
            className="scrim legible self-end md:col-span-7 md:col-start-6 md:text-right"
            delay={0.1}
          >
            <h2
              id="story-brain-title"
              className="text-4xl font-light leading-[1.05] tracking-[-0.045em] text-ink sm:text-6xl lg:text-7xl"
            >
              From model
              <br /> to production.
            </h2>
            <div className="mt-8 flex md:justify-end">
              <a href="#projects" className={`${btn.secondary} group`}>
                View work
                <ArrowRightIcon
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </Focus>
        </div>
      </section>
    </>
  );
}
