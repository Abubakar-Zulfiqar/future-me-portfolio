import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Fades content up once as it enters the viewport. `blur` brings it into focus from a blur,
 * matching the particle story above. Static under reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  blur = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  blur?: boolean;
}) {
  const reduce = useReducedMotion();
  const hidden = blur ? { opacity: 0, y: 18, filter: "blur(12px)" } : { opacity: 0, y: 24 };
  const shown = blur ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 1, y: 0 };
  return (
    <motion.div
      className={className}
      initial={reduce ? false : hidden}
      whileInView={shown}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: blur ? 0.9 : 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal blur className="scrim legible w-fit">
          <h2
            id={`${id}-title`}
            className="pb-1 text-4xl font-light leading-[1.05] tracking-[-0.045em] text-ink md:text-6xl"
          >
            {title}
          </h2>
          {intro && (
            <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-ink-muted md:text-lg">
              {intro}
            </p>
          )}
        </Reveal>
        <div className="mt-12 md:mt-14">{children}</div>
      </div>
    </section>
  );
}

/** Small monospace tag used for stack items. */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-line bg-surface-2 px-2 py-0.5 font-mono text-xs text-ink-subtle">
      {children}
    </span>
  );
}
