import { useEffect, useState } from "react";
import { trackContact } from "@/lib/documents";

const links = [
  { id: "about", label: "about" },
  { id: "skills", label: "stack" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "contact", label: "contact" },
];

const HIRE_URL =
  "https://wa.me/923424545401?text=Hi%20Abubakar%2C%20I%27m%20interested%20in%20hiring%20you!";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently crossing the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const l of links) {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        open
          ? "bg-background border-b border-border"
          : scrolled
            ? "backdrop-blur-md bg-background/85 border-b border-border"
            : ""
      }`}
    >
      <nav
        aria-label="Primary"
        className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between font-mono text-sm"
      >
        <a href="#top" className="flex items-center gap-2 text-primary text-glow">
          <span className="text-accent">~/</span>
          <span className="font-semibold">mian_abubakar</span>
          <span className="cursor-blink" aria-hidden="true" />
        </a>
        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? "location" : undefined}
                className={`whitespace-nowrap px-3 py-1.5 transition-colors rounded-sm hover:text-primary hover:bg-secondary ${
                  active === l.id ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <span className="text-accent">·</span> {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a
            href={HIRE_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackContact("whatsapp", "nav")}
            className="hidden sm:inline-flex items-center gap-2 border border-primary/40 text-primary px-3 py-1.5 rounded-sm hover:bg-primary hover:text-primary-foreground transition-all shadow-glow-sm"
          >
            [hire_me]
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="lg:hidden inline-flex items-center justify-center size-10 border border-border rounded-sm text-primary hover:border-primary transition-colors"
          >
            <span aria-hidden="true" className="text-base leading-none">
              {open ? "✕" : "≡"}
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="lg:hidden border-t border-border px-4 pb-4 font-mono">
          <ul className="py-2">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === l.id ? "location" : undefined}
                  className={`block py-3 border-b border-border/60 ${
                    active === l.id ? "text-primary" : "text-foreground"
                  }`}
                >
                  <span className="text-accent">$</span> cd {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={HIRE_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              trackContact("whatsapp", "mobile_nav");
              setOpen(false);
            }}
            className="mt-3 flex justify-center bg-primary text-primary-foreground py-3 rounded-sm shadow-glow-sm"
          >
            [hire_me] → whatsapp
          </a>
        </div>
      )}
    </header>
  );
}
