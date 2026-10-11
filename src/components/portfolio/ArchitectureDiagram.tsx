import { motion, useReducedMotion } from "motion/react";

export type FlowNode = { title: string; detail: string };

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * A real architecture flow for a project: each node is a component of the system, drawn in
 * request order. The sequential reveal tells the story of a request moving through it.
 */
export function ArchitectureDiagram({
  nodes,
  orientation = "vertical",
  label,
}: {
  nodes: FlowNode[];
  orientation?: "horizontal" | "vertical";
  label: string;
}) {
  const reduce = useReducedMotion();
  const horizontal = orientation === "horizontal";
  const step = 0.09;

  return (
    <figure
      aria-label={label}
      className="rounded-[var(--radius-card)] border border-[var(--glass-border)] bg-bg/35 p-4 sm:p-5"
    >
      <ol
        className={
          horizontal ? "flex flex-col gap-0 lg:flex-row lg:items-stretch" : "flex flex-col gap-0"
        }
      >
        {nodes.map((n, i) => (
          <li
            key={n.title}
            className={
              horizontal ? "flex flex-col lg:flex-1 lg:flex-row lg:items-stretch" : "flex flex-col"
            }
          >
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: i * step, ease: EASE }}
              className="flex-1 rounded-[var(--radius-control)] border border-[var(--glass-border)] bg-surface-2/70 px-3.5 py-3 shadow-[inset_0_1px_0_var(--glass-edge)]"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-[11px] text-ink-faint tabular" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium text-ink">{n.title}</span>
              </div>
              <p className="mt-1 text-[13px] leading-snug text-ink-subtle">{n.detail}</p>
            </motion.div>

            {i < nodes.length - 1 && (
              <div
                aria-hidden="true"
                className={
                  horizontal
                    ? "flex h-5 justify-center lg:h-auto lg:w-5 lg:shrink-0 lg:items-center"
                    : "flex h-5 justify-center"
                }
              >
                <motion.span
                  initial={reduce ? false : { scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.35, delay: i * step + 0.15, ease: EASE }}
                  className={
                    horizontal
                      ? "block h-full w-px origin-top bg-line-strong lg:h-px lg:w-full lg:origin-left"
                      : "block h-full w-px origin-top bg-line-strong"
                  }
                />
              </div>
            )}
          </li>
        ))}
      </ol>
      <figcaption className="sr-only">
        {label}: {nodes.map((n) => n.title).join(", then ")}.
      </figcaption>
    </figure>
  );
}
