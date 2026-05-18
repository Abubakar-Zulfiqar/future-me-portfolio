import { SectionLabel } from "./About";

const channels = [
  { k: "email", v: "abubakarmian583@gmail.com", href: "mailto:abubakarmian583@gmail.com" },
  { k: "phone", v: "+92 342 4545401", href: "tel:+923424545401" },
  { k: "linkedin", v: "/in/mian-abubakar", href: "https://linkedin.com" },
  { k: "location", v: "Lahore, PK · remote-friendly (US/EU)", href: null },
];

export function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel index="05" title="contact" />

        <div className="mt-12 grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <h3 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold leading-tight break-words">
              <span className="text-foreground">Let&apos;s build something</span>{" "}
              <span className="text-primary text-glow">unreasonable</span>
              <span className="text-accent">.</span>
            </h3>
            <p className="font-mono text-sm text-muted-foreground mt-6 max-w-lg leading-relaxed">
              <span className="text-primary">//</span> open to full-time remote roles, AI / full-stack
              contracts, and ambitious greenfield projects. typical response time: under 24h.
            </p>

            <a
              href="mailto:abubakarmian583@gmail.com"
              className="mt-8 inline-flex items-center gap-3 bg-primary text-primary-foreground font-mono px-6 py-3 rounded-sm shadow-glow hover:scale-[1.02] transition-transform"
            >
              <span>./send_message.sh</span>
              <span>→</span>
            </a>
          </div>

          <div className="lg:col-span-5 border border-border bg-card/70 backdrop-blur-sm rounded-sm overflow-hidden scanlines relative">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-background/50">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-destructive/70" />
                <span className="size-2.5 rounded-full bg-accent/70" />
                <span className="size-2.5 rounded-full bg-primary/70" />
              </div>
              <span className="font-mono text-xs text-muted-foreground">contact.json</span>
              <span />
            </div>
            <div className="p-5 font-mono text-sm space-y-2 relative z-10">
              <div className="text-muted-foreground">{"{"}</div>
              {channels.map((c, i) => (
                <div key={c.k} className="pl-4 flex flex-wrap items-baseline gap-1">
                  <span className="text-primary">&quot;{c.k}&quot;</span>
                  <span className="text-muted-foreground">:</span>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="text-accent hover:text-glow-amber hover:underline break-all"
                    >
                      &quot;{c.v}&quot;
                    </a>
                  ) : (
                    <span className="text-accent break-all">&quot;{c.v}&quot;</span>
                  )}
                  {i < channels.length - 1 && <span className="text-muted-foreground">,</span>}
                </div>
              ))}
              <div className="text-muted-foreground">{"}"}</div>
            </div>
          </div>
        </div>

        <footer className="mt-24 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-muted-foreground">
          <div>
            <span className="text-primary">©</span> 2026 mian_abubakar &nbsp;
            <span className="text-accent">·</span> built with care &amp; caffeine
          </div>
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-primary animate-pulse shadow-glow-sm" />
            system_online
          </div>
        </footer>
      </div>
    </section>
  );
}
