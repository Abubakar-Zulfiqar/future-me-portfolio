import { useEffect, useState } from "react";

const links = [
  { id: "about", label: "about" },
  { id: "skills", label: "stack" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "contact", label: "contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md bg-background/70 border-b border-border" : ""
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between font-mono text-sm">
        <a href="#top" className="flex items-center gap-2 text-primary text-glow">
          <span className="text-accent">~/</span>
          <span className="font-semibold">abubakar.dev</span>
          <span className="cursor-blink" />
        </a>
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className="px-3 py-1.5 text-muted-foreground hover:text-primary hover:bg-secondary transition-colors rounded-sm"
              >
                <span className="text-accent">·</span> {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="mailto:abubakarmian583@gmail.com"
          className="hidden sm:inline-flex items-center gap-2 border border-primary/40 text-primary px-3 py-1.5 rounded-sm hover:bg-primary hover:text-primary-foreground transition-all shadow-glow-sm"
        >
          [hire_me]
        </a>
      </nav>
    </header>
  );
}
