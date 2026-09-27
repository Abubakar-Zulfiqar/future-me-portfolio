import { useEffect, useState } from "react";
import { resumeDoc, trackDownload } from "@/lib/documents";

const lines = [
  { p: "$", c: "whoami" },
  { p: ">", c: "mian_muhammad_abubakar" },
  { p: "$", c: "cat role.txt" },
  { p: ">", c: "Software Engineer · Full-Stack & AI Integration" },
  { p: "$", c: "uptime" },
  { p: ">", c: "4+ years · 10,000+ MAU shipped · UAE gov AI platforms" },
];

export function Hero() {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setShown(lines.length);
  }, []);
  useEffect(() => {
    if (shown >= lines.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), 380);
    return () => clearTimeout(t);
  }, [shown]);

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center pt-24 pb-16 px-4 sm:px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-12 gap-10 items-center relative">
        <div className="lg:col-span-7 space-y-6 sm:space-y-8 min-w-0">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs text-accent border border-accent/30 px-2.5 py-1 rounded-sm max-w-full">
            <span className="size-1.5 rounded-full bg-accent shadow-glow-sm animate-pulse shrink-0" />
            <span className="truncate">STATUS: AVAILABLE_FOR_REMOTE_ROLES</span>
          </div>

          <h1 className="font-sans text-[2.25rem] sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight">
            <span className="block text-foreground">Engineering</span>
            <span className="block text-primary text-glow crt-flicker">
              intelligent_
              <wbr />
              systems
            </span>
            <span className="block text-muted-foreground text-2xl sm:text-3xl md:text-5xl mt-2 font-mono">
              <span className="text-accent">{">"}</span> that ship.
            </span>
          </h1>

          <p className="text-muted-foreground max-w-xl leading-relaxed font-mono text-sm">
            I build production-grade full-stack and AI-powered SaaS platforms — multi-agent
            orchestration, RAG pipelines, real-time avatar interviews, and multi-tenant systems used
            by tens of thousands of people.
          </p>

          <div className="flex flex-wrap gap-3 font-mono text-sm">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-sm shadow-glow hover:scale-[1.02] transition-transform"
            >
              ./view_projects.sh
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-border text-foreground px-5 py-2.5 rounded-sm hover:border-primary hover:text-primary transition-colors"
            >
              <span className="text-accent">@</span> contact()
            </a>
            <a
              href={resumeDoc.href}
              download={resumeDoc.file}
              onClick={() => trackDownload(resumeDoc.k)}
              className="inline-flex items-center gap-2 border border-border text-foreground px-5 py-2.5 rounded-sm hover:border-accent hover:text-accent transition-colors"
            >
              <span className="text-accent">↓</span> resume.pdf
            </a>
          </div>
        </div>

        {/* Terminal window */}
        <div className="lg:col-span-5">
          <div className="relative rounded-md border border-border bg-card/80 backdrop-blur shadow-glow overflow-hidden scanlines">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-background/50">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-destructive/70" />
                <span className="size-2.5 rounded-full bg-accent/70" />
                <span className="size-2.5 rounded-full bg-primary/70" />
              </div>
              <span className="font-mono text-xs text-muted-foreground">~ — zsh — 80×24</span>
              <span className="font-mono text-xs text-primary">●</span>
            </div>
            <div className="p-3 sm:p-5 font-mono text-xs sm:text-sm space-y-1.5 min-h-[260px] sm:min-h-[340px] relative z-10">
              {lines.slice(0, shown).map((l, i) => (
                <div key={i} className="flex gap-2 min-w-0">
                  <span className={`shrink-0 ${l.p === "$" ? "text-accent" : "text-primary/60"}`}>
                    {l.p}
                  </span>
                  <span
                    className={`break-words min-w-0 ${l.p === "$" ? "text-foreground" : "text-primary text-glow"}`}
                  >
                    {l.c}
                  </span>
                </div>
              ))}
              {shown >= lines.length && (
                <div className="flex gap-2 pt-2">
                  <span className="text-accent">$</span>
                  <span className="cursor-blink text-foreground" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
