import type { CSSProperties } from "react";
import { ArrowRightIcon, DownloadIcon } from "@radix-ui/react-icons";
import { resumeDoc, trackDownload } from "@/lib/documents";
import { btn } from "./buttons";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * Hero: oversized light headline over the particle orb (rendered by the fixed ParticleField
 * behind the page). The orb sits mid-screen; copy holds the top-left and a hairline footer row.
 */
export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100dvh] flex-col px-4 pt-28 sm:px-6">
      {/* Soft glow: the visual if WebGL is unavailable, and atmosphere behind the orb. */}
      <div aria-hidden="true" className="hero-glow absolute inset-0 z-[-2]" />

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col">
        <p
          className="enter inline-flex w-fit items-center gap-2 rounded-full border border-[var(--glass-border)] bg-bg/40 px-3 py-1 text-sm text-ink-muted backdrop-blur-md"
          style={step(0)}
        >
          <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
          Available for new roles
        </p>

        <h1
          className="enter-blur scrim legible mt-7 max-w-[11ch] pb-2 text-[3.25rem] font-light leading-[1] tracking-[-0.05em] text-ink sm:text-7xl lg:text-[6rem]"
          style={step(1)}
        >
          I build AI systems <span className="text-lit">that ship.</span>
        </h1>

        <div className="flex-1" />

        <div
          className="enter scrim legible mb-8 grid grid-cols-1 gap-6 border-t border-[var(--glass-border)] pt-6 md:grid-cols-12 md:items-end"
          style={step(3)}
        >
          <p className="max-w-[44ch] text-base leading-relaxed text-ink-muted md:col-span-6">
            Full-stack and AI engineer. I built a UAE government talent platform solo, and AI
            pipelines used by 10,000+ people monthly.
          </p>
          <div className="flex flex-wrap items-center gap-3 md:col-span-6 md:justify-end">
            <a href="#projects" className={`${btn.primary} group`}>
              View work
              <ArrowRightIcon
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
            <a
              href={resumeDoc.href}
              download={resumeDoc.file}
              onClick={() => trackDownload(resumeDoc.k)}
              className={btn.secondary}
            >
              <DownloadIcon className="size-4" aria-hidden="true" />
              Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
