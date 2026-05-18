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
        <div className="grid lg:grid-cols-12 gap-10 mt-10">
          <div className="lg:col-span-7 space-y-5 font-mono text-sm leading-relaxed text-muted-foreground">
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

          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            {stats.map((s) => (
              <div
                key={s.k}
                className="border border-border bg-card/60 backdrop-blur-sm p-5 rounded-sm hover:border-primary/60 hover:shadow-glow-sm transition-all group"
              >
                <div className="font-sans text-4xl font-bold text-primary text-glow">{s.v}</div>
                <div className="font-mono text-xs text-muted-foreground mt-2">
                  <span className="text-accent">$</span> {s.k}
                </div>
              </div>
            ))}
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
