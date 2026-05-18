import portrait from "@/assets/abubakar.png";

const stats = [
  { k: "years_exp", v: "3+" },
  { k: "monthly_users", v: "10k+" },
  { k: "projects_shipped", v: "10+" },
  { k: "ai_agents_orchestrated", v: "32" },
];

export function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel index="01" title="about" />
        <div className="grid lg:grid-cols-12 gap-10 mt-10 items-start">
          {/* Portrait card */}
          <div className="lg:col-span-4 order-1">
            <div className="relative group">
              {/* Corner brackets */}
              <span className="absolute -top-2 -left-2 size-5 border-t-2 border-l-2 border-primary z-20" />
              <span className="absolute -top-2 -right-2 size-5 border-t-2 border-r-2 border-primary z-20" />
              <span className="absolute -bottom-2 -left-2 size-5 border-b-2 border-l-2 border-primary z-20" />
              <span className="absolute -bottom-2 -right-2 size-5 border-b-2 border-r-2 border-primary z-20" />

              <div className="relative border border-border bg-card rounded-sm overflow-hidden scanlines shadow-glow">
                {/* Photo with phosphor tint */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={portrait}
                    alt="Mian Muhammad Abubakar"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    style={{ filter: "contrast(1.05)" }}
                  />
                  {/* Phosphor wash */}
                  <div
                    className="absolute inset-0 mix-blend-screen opacity-40 group-hover:opacity-10 transition-opacity duration-700"
                    style={{
                      background:
                        "linear-gradient(180deg, oklch(0.87 0.24 145 / 0.4) 0%, oklch(0.87 0.24 145 / 0.15) 100%)",
                    }}
                  />
                  {/* Vignette */}
                  <div className="absolute inset-0 pointer-events-none" style={{
                    boxShadow: "inset 0 0 80px oklch(0.05 0 0 / 0.8)",
                  }} />
                </div>

                {/* ID bar */}
                <div className="flex items-center justify-between px-3 py-2 border-t border-border bg-background/80 font-mono text-[10px]">
                  <span className="text-primary">● REC</span>
                  <span className="text-muted-foreground tracking-widest">ID_0x4B7</span>
                  <span className="text-accent">CH_01</span>
                </div>
              </div>

              {/* Caption strip */}
              <div className="mt-3 font-mono text-[11px] text-muted-foreground flex justify-between">
                <span><span className="text-accent">▸</span> subject: m.abubakar</span>
                <span className="text-primary">verified ✓</span>
              </div>
            </div>
          </div>

          {/* Bio + stats */}
          <div className="lg:col-span-8 order-2 space-y-8">
            <div className="space-y-5 font-mono text-sm leading-relaxed text-muted-foreground">
              <p>
                <span className="text-primary">//</span> I&apos;m{" "}
                <span className="text-foreground">Mian Muhammad Abubakar</span>, a software
                engineer based in Lahore, Pakistan, shipping production-grade systems for
                startups, governments, and enterprise clients across the UK, UAE, and Pakistan.
              </p>
              <p>
                I specialize in <span className="text-primary text-glow">multi-agent AI orchestration</span>,
                retrieval-augmented generation, real-time architectures, and high-throughput
                data pipelines. I&apos;ve built platforms that screen national talent for the UAE
                government, run UK transport operators, and unify 8+ work apps into one
                intelligent assistant.
              </p>
              <p>
                I own end-to-end delivery — database schema, API design, frontend, and cloud
                deployment across AWS and Azure. Open to remote roles in US and EU markets.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map((s) => (
                <div
                  key={s.k}
                  className="border border-border bg-card/60 backdrop-blur-sm p-4 rounded-sm hover:border-primary/60 hover:shadow-glow-sm transition-all"
                >
                  <div className="font-sans text-3xl font-bold text-primary text-glow">{s.v}</div>
                  <div className="font-mono text-[10px] text-muted-foreground mt-2 truncate">
                    <span className="text-accent">$</span> {s.k}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-center gap-4 font-mono">
      <span className="text-accent text-sm">[{index}]</span>
      <h2 className="text-2xl md:text-3xl font-sans font-semibold text-foreground">
        <span className="text-primary">#</span> {title}
      </h2>
      <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
    </div>
  );
}
